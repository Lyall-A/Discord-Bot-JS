// TODO: finish (like client class and stuff)

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

class Client {
    constructor(token, intents) {
        this.token = token;
        this.gateway = new Gateway();
        this.gateway.opOn(10, data => {
            console.log("Hello,", data);
        });
    }
};

class Gateway {
    constructor() {
        this.opListeners = { };
        this.eventListeners = { };

        // https://discord.com/developers/docs/topics/gateway#connection-lifecycle
        this.gateway = new utils.ws.connection(`${config.discord.gatewayUrl}?v=${config.discord.gatewayVersion}`, { json: true });
        this.gateway.on("message", message => {
            // TODO: remove JSON parse after removing ws dep
            const json = JSON.parse(message);

            if (json.op) utils.eventListener.call(json.op, this.opListeners, [json.d, json]);
            if (json.t) utils.eventListener.call(json.t, this.eventListeners, [json.d, json]);
        });
    }

    opOn(op, callback) { utils.eventListener.create(op, callback, this.opListeners) }
    eventOn(op, callback) { utils.eventListener.create(op, callback, this.eventListeners) }
    // TODO: remove JSON stringify after removing ws dep
    send(op, data) { this.gateway.send(JSON.stringify({ s: null, op, d: data })) };
};
module.exports = {
    intents,
    Client,
    Gateway
}