// TODO: event deletion on gateway close and stuff like that

const { utils, config, secret } = globals;

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

function parseIntents(array) {
    return array.map(i => intents[i.toUpperCase()]).filter(i=>i).reduce((prev, curr) => prev + curr);
}

function parseIntentsInt(int) {
    const parsed = [ ];
    Object.entries(intents).reverse().forEach((name, value) => {
        if (int <= value) {
            int - value;
            parsed.push(name);
        };
    });
    return parsed;
}

function api(path, options) {
    return utils.http(`${config.discord.apiUrl}/v${config.discord.apiVersion}${path}`, utils.objectDefaults(options, { headers: { "Authorization": `Bot ${secret.discord.token}` } }));
}

function sendMessage(channelId, content, embeds, data) {
    // TODO: make good
    return api(`/channels/${channelId}/messages`, {
        method: "POST",
        json: {
            content,
            embeds,
            ...data
        }
    });
}

class Client {
    constructor(token, intents, identity) {
        this.listeners = [ ];
        identity = utils.objectDefaults(identity, {
            properties: utils.objectDefaults(config.discord.properties, { }),
            presence: utils.objectDefaults(config.discord.presence, { })
        });
        const intentsInt = (typeof intents == "object" ? parseIntents(intents) : intents) || 0;

        // https://discord.com/developers/docs/topics/gateway#connection-lifecycle
        this.gateway = new Gateway(); // Stage 1
        this.gateway.onOp(10, data => {
            // Hello event (stage 2)
            this.heartbeatInterval = setInterval(() => this.gateway.send(1, null), data.heartbeat_interval); // Heartbeat interval (stage 3)
            // Send identity (stage 4)
            this.gateway.send(2, {
                token,
                intents: intentsInt,
                ...identity
            });
        });
        this.gateway.onOp(0, (data, message) => {
            setTimeout(() => utils.eventListener.call(message.t.toUpperCase(), this.listeners, [data, message]));
        });
        this.gateway.onEvent("READY", data => {
            this.readyTime = Date.now() - this.gateway.beforeConnectTime;
            this.bot = data;
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

    on = (event, callback) => { utils.eventListener.create(event.toUpperCase(), callback, this.listeners) };
    close = () => { this.gateway.close() };
};

class Gateway {
    constructor() {
        this.listeners = { };
        this.opListeners = { };
        this.eventListeners = { };

        this.beforeConnectTime = Date.now();
        this.gateway = new utils.ws.connection(`${config.discord.gatewayUrl}?v=${config.discord.gatewayVersion}&encoding=json`, { json: true });
        this.gateway.on("open", () => this.connectTime = Date.now() - this.beforeConnectTime);
        this.gateway.on("message", message => {
            if (typeof message.op == "number") utils.eventListener.call(message.op, this.opListeners, [message.d, message]);
            if (message.t && !message.op) utils.eventListener.call(message.t, this.eventListeners, [message.d, message]);
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
    parseIntents,
    parseIntentsInt,
    api,
    sendMessage,
    Client,
    Gateway
}