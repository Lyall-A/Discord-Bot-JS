// TODO: event deletion on gateway close and stuff like that
// TODO: delete all these functions?

// const { utils, config, secret } = globals;

const classes = require("./discord.classes");
const constants = require("./discord.constants");
const functions = require("./discord.functions");

const getIdFromToken = require("../getIdFromToken");
const objectDefaults = require("../objectDefaults");
const eventListener = require("../eventListener");
const ws = require("../ws");

const { Event, Command, CommandOption, Application, User, Guild } = classes;
const { intents, statusCodes, gatewayOpcodes, gatewayCloseEventCodes, applicationCommandTypes, voiceOpcodes, voiceCloseEventCodes, applicationCommandOptionTypes } = constants;
const { parseIntents, parseIntentsInt, api } = functions;

class Client {
    constructor(token, intents, identity) {
        this.token = token;
        this.intents = intents;

        this.id = getIdFromToken(token);

        this.listeners = [];

        identity = objectDefaults(identity, {
            properties: objectDefaults(config.discord.properties, {}),
            presence: objectDefaults(config.discord.presence, {})
        });
        this.identity = identity;
        this.intentsInt = (typeof intents == "object" ? parseIntents(intents) : intents) || 0;

        // https://discord.com/developers/docs/topics/gateway#connection-lifecycle
        this.gateway = new Gateway(); // Stage 1
        this.gateway.onOp(10, data => {
            // Hello event (stage 2)

            // Heartbeat interval (stage 3) moved to Gateway class

            // Send identity (stage 4)
            this.gateway.send(2, {
                token,
                intents: this.intentsInt,
                ...identity
            });
        });

        this.gateway.onOp(0, (rawData, message) => {
            // TODO: i wanna make it return my own object instead of just what gateway sends (aka effort)
            const eventName = message.t.toUpperCase();
            // const data = events[eventName] ? new events[eventName](data) : { _raw: rawData };
            const event = new Event(eventName, rawData);

            // NOTE: this is in a setTimeout so the below READY event is called first
            setTimeout(() => {
                eventListener.call(eventName, this.listeners, [event, message]);
            });
        });

        this.gateway.onEvent("READY", data => {
            // TODO: a lot
            this.user = data.user;
        });

        this.gateway.on("close", code => {
            if (code == 1000) return;
            // TODO: Reconnect
            console.log(this.gateway)
        });
    }

    on = (event, callback) => { eventListener.create(event.toUpperCase(), callback, this.listeners) };
    close = () => { this.gateway.close() };

    // TODO: make this, copying djs????????
    // This is the main stuff
    // TODO: make these reject if requests arent succesfuls
    // TODO: stuff like create functions will need a "builder" if u want to use ur own data. if that makes sense
    applications = {
        get: (applicationId) => api(`/applications/${applicationId || "@me"}`).then(i => i.json()).then(application => new Application(application)),
        commands: {
            global: {
                get: () => api(`/applications/${this.id}/commands`).then(i => i.json()).then(commands => commands.map(i => new Command(i))),
                create: (command) => api(`/applications/${this.id}/commands`, { method: "POST", json: command }),
                edit: async () => {
                },
                delete: async () => {
                },
                bulkOverwrite: async () => {
                }
            },
            guild: {
                get: (guildId) => api(`/applications/${this.id}/guilds/${guildId}/commands`).then(i => i.json()).then(commands => commands.map(command => new Command(command))),
                create: async (command) => {
                },
                edit: async () => {
                },
                delete: async () => {
                },
                bulkOverwrite: async () => {
                }
            }
        }
    }

    users = {
        get: async (userId) => {
            const req = await api(`/users/${userId || "@me"}`);
            const user = await req.json().then(user => new User(user));
            if (!statusCodes["user"].includes(req.status)) throw new Error(); // TODO: make error, make class to "parse" discord error responses?
            return user;
        }
    }

    guilds = {
        get: (guildId) => api(`/guilds/${guildId}`).then(i => i.json()).then(guild => new Guild(guild)),
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
        this.gateway = new ws.connection(`${globals.gatewayUrl}?v=${config.discord.gatewayVersion}&encoding=json`, { json: true });

        this.gateway.on("open", () => this.connectTime = Date.now() - this.beforeConnectTime);

        this.gateway.on("message", message => {
            if (typeof message.op == "number") eventListener.call(message.op, this.opListeners, [message.d, message]);
            if (message.t && !message.op) eventListener.call(message.t, this.eventListeners, [message.d, message]);
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
    onOp = (op, callback) => { eventListener.create(op, callback, this.opListeners) };
    onEvent = (event, callback) => { eventListener.create(event.toUpperCase(), callback, this.eventListeners) };
    send = (op, data) => { this.gateway.send({ s: null, op, d: data }) };
    close = () => { this.gateway.close(1000) };
};

module.exports = {
    ...classes,
    ...constants,
    ...functions,
    Client,
    Gateway
}