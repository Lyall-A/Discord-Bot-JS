// TODO: event deletion on gateway close and stuff like that
// TODO: delete all these functions?

const { utils, config, secret } = globals;

// https://discord.com/developers/docs/topics/gateway#list-of-intents
const intents = {
    GUILDS: 1 << 0,
    GUILD_MEMBERS: 1 << 1,
    GUILD_MODERATION: 1 << 2,
    GUILD_EMOJIS_AND_STICKERS: 1 << 3,
    GUILD_INTEGRATIONS: 1 << 4,
    GUILD_WEBHOOKS: 1 << 5,
    GUILD_INVITES: 1 << 6,
    GUILD_VOICE_STATES: 1 << 7,
    GUILD_PRESENCES: 1 << 8,
    GUILD_MESSAGES: 1 << 9,
    GUILD_MESSAGE_REACTIONS: 1 << 10,
    GUILD_MESSAGE_TYPING: 1 << 11,
    DIRECT_MESSAGES: 1 << 12,
    DIRECT_MESSAGE_REACTIONS: 1 << 13,
    DIRECT_MESSAGE_TYPING: 1 << 14,
    MESSAGE_CONTENT: 1 << 15,
    GUILD_SCHEDULED_EVENTS: 1 << 16,
    AUTO_MODERATION_CONFIGURATION: 1 << 20,
    AUTO_MODERATION_EXECUTION: 1 << 21
};

// https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes
const gatewayOpcodes = {
    dispatch: 0,
    heartbeat: 1,
    identify: 2,
    presenceUpdate: 3,
    voiceStateUpdate: 4,
    resume: 6,
    reconnect: 7,
    requestGuildMembers: 8,
    invalidSession: 9,
    hello: 10,
    heartbeatAck: 11
};

// https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes
const gatewayCloseEventCodes = {
    // TODO
};

const applicationCommandTypes = {
    CHAT_INPUT: 1, // Slash commands; a text-based command that shows up when a user types /
    USER: 2, // A UI-based command that shows up when you right click or tap on a user
    MESSAGE: 3 // A UI-based command that shows up when you right click or tap on a message
};

// https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes
const voiceOpcodes = {
    // TODO
};

// https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-close-event-codes
const voiceCloseEventCodes = {
    // TODO
};

// https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
const applicationCommandOptionTypes = {
    SUB_COMMAND: 1,
    SUB_COMMAND_GROUP: 2,
    STRING: 3,
    INTEGER: 4, // Any integer between -2^53 and 2^53
    BOOLEAN: 5,
    USER: 6,
    CHANNEL: 7, // Includes all channel types + categories
    ROLE: 8,
    MENTIONABLE: 9, // Includes users and roles
    NUMBER: 10, // Any double between -2^53 and 2^53
    ATTACHMENT: 11 // attachment object
}

const events = {
    // TODO: make better? this is probably the shittiest way possible
    INTERACTION_CREATE: class {
        constructor(rawData) {
            this._raw = rawData;
        };

        token = this._raw.token;
    }
}

function parseIntents(array) {
    // Object > Number
    return array.map(i => intents[i.toUpperCase()]).filter(i => i).reduce((prev, curr) => prev + curr);
}

function parseIntentsInt(int) {
    // Number > Object
    const parsed = [];
    Object.entries(intents).reverse().forEach(([name, value]) => {
        if (int >= value) {
            int -= value;
            parsed.push(name);
        };
    });
    return parsed.reverse();
}

function api(path, options) {
    return utils.http(`${config.discord.apiUrl}/v${config.discord.apiVersion}${path}`, utils.objectDefaults(options, { headers: { "Authorization": `Bot ${secret.discord.token}` } }));
}

class Client {
    constructor(token, intents, identity) {
        this.listeners = [];
        identity = utils.objectDefaults(identity, {
            properties: utils.objectDefaults(config.discord.properties, {}),
            presence: utils.objectDefaults(config.discord.presence, {})
        });
        const intentsInt = (typeof intents == "object" ? parseIntents(intents) : intents) || 0;

        // https://discord.com/developers/docs/topics/gateway#connection-lifecycle
        this.gateway = new Gateway(); // Stage 1
        this.gateway.onOp(10, data => {
            // Hello event (stage 2)

            // Heartbeat interval (stage 3) moved to Gateway class

            // Send identity (stage 4)
            this.gateway.send(2, {
                token,
                intents: intentsInt,
                ...identity
            });
        });

        this.gateway.onOp(0, (rawData, message) => {
            // TODO: i wanna make it return my own object instead of just what gateway sends (aka effort)
            const eventName = message.t.toUpperCase();
            const data = events[eventName] ? new events[eventName](data) : { _raw: rawData };

            // NOTE: this is in a setTimeout so the below READY event is called first
            setTimeout(() => {
                utils.eventListener.call(eventName, this.listeners, [data, message]);
            });
        });

        this.gateway.onEvent("READY", data => {
            // TODO: a lot
            this.user = data.user;
        });

        this.gateway.on("close", code => {
            if (code == 1000) return;
            // Reconnect
            console.log(this.gateway)
        });
    }

    on = (event, callback) => { utils.eventListener.create(event.toUpperCase(), callback, this.listeners) };
    close = () => { this.gateway.close() };

    // TODO: make this, copying djs????????
    application = {

    }

    users = {

    }

    guilds = {

    }

    channels = {

    }
};

class Gateway {
    constructor() {
        this.listeners = {};
        this.opListeners = {};
        this.eventListeners = {};

        this.beforeConnectTime = Date.now();
        this.gateway = new utils.ws.connection(`${globals.gatewayUrl}?v=${config.discord.gatewayVersion}&encoding=json`, { json: true });

        this.gateway.on("open", () => this.connectTime = Date.now() - this.beforeConnectTime);

        this.gateway.on("message", message => {
            if (typeof message.op == "number") utils.eventListener.call(message.op, this.opListeners, [message.d, message]);
            if (message.t && !message.op) utils.eventListener.call(message.t, this.eventListeners, [message.d, message]);
        });

        this.onOp(10, data => {
            if (!data.heartbeat_interval) throw new Error("No heartbeat_interval in data")
            this.heartbeatInterval = setInterval(() => this.send(1, null), data.heartbeat_interval); // Heartbeat interval (stage 3)
        });

        this.onEvent("READY", data => {
            this.user = data.user;
            this.gatewayVersion = data.v;
            this.sessionType = data.session_type;
            this.sessionId = data.session_id;
            this.resumeGatewayUrl = data.resume_gateway_url;
            this.guilds = data.guilds
            this.application = data.application;
            this.rtcRegions = data.geo_ordered_rtc_regions;
        });
    }

    on = (event, callback) => { this.gateway.on(event, callback) };
    onOp = (op, callback) => { utils.eventListener.create(op, callback, this.opListeners) };
    onEvent = (event, callback) => { utils.eventListener.create(event.toUpperCase(), callback, this.eventListeners) };
    send = (op, data) => { this.gateway.send({ s: null, op, d: data }) };
    close = () => { this.gateway.close(1000) };
};

module.exports = {
    intents,
    applicationCommandTypes,
    applicationCommandOptionTypes,
    parseIntents,
    parseIntentsInt,
    api,
    Client,
    Gateway
    // getGlobalCommands,
    // sendMessage,
}