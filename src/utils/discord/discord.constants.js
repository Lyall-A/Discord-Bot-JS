// const classes = require("./discord.classes");
// const functions = require("./discord.functions");

module.exports = {
    // https://discord.com/developers/docs/topics/gateway#list-of-intents
    intents: {
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
    },
    
    // https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes
    gatewayOpcodes: {
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
    },

    // https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes
    gatewayCloseEventCodes: {
        // TODO
    },

    applicationCommandTypes: {
        CHAT_INPUT: 1, // Slash commands; a text-based command that shows up when a user types /
        USER: 2, // A UI-based command that shows up when you right click or tap on a user
        MESSAGE: 3 // A UI-based command that shows up when you right click or tap on a message
    },

    // https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes
    voiceOpcodes: {
        // TODO
    },

    // https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-close-event-codes
    voiceCloseEventCodes: {
        // TODO
    },

    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
    applicationCommandOptionTypes: {
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
}