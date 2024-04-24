const constants = require("./discord.constants");
const functions = require("./discord.functions");

class Event {
    constructor(eventName, rawData) {
        this._raw = rawData;

        // TODO
        if (rawData.version) this.version = rawData.version; // included in: INTERACTION_CREATE
        if (rawData.type) this.type = rawData.type; // included in: INTERACTION_CREATE
        if (rawData.token) this.token = rawData.token; // included in: INTERACTION_CREATE
        if (rawData.member) this.member = new Member(rawData.member); // included in: INTERACTION_CREATE (and a lot more)
        if (rawData.id) this.id = rawData.id; // included in: INTERACTION_CREATE (and a lot more)

        if (eventName == "INTERACTION_CREATE") {
            this.typeString = Object.keys(constants.applicationCommandTypes).find(i => constants.applicationCommandTypes[i] == this.type);
            // TODO: RESPOND FUNCTION IS JUST FOR TESTING BECAUSE I JUST REALLY WANTED THE BOT TO RESPOND
            this.respond = () => functions.api(`/interactions/${this.id}/${this.token}/callback`, { method: "POST", json: { type: 4, data: { content: "hi" } } })
        }
    }
};

// TODO: idk what im doing
class Command {
    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure
    constructor(rawCommand) {
        this._raw = rawCommand;

        this.id = rawCommand.id;
        this.applicationId = rawCommand.application_id;
        this.type = rawCommand.type;
        this.typeString = Object.entries(constants.applicationCommandTypes).find(([key, value]) => value == rawCommand.type)?.[0];
        this.name = rawCommand.name;
        this.description = rawCommand.description;
        this.nsfw = rawCommand.nsfw;
        this.options = rawCommand.options ? rawCommand.options.map(i => new CommandOption(i)) : null
    }
};

class CommandOption {
    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
    constructor(rawOption) {
        this._raw = rawOption;
        // TODO implement this from https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
    }
};

class Application {
    // TODO
};

class Member {
    // https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure
    constructor(rawMember) {
        this._raw = rawMember;

        this.user = new User(rawMember.user);
    }
};

class User {
    // https://discord.com/developers/docs/resources/user#user-object-user-structure
    constructor(rawUser) {
        this._raw = rawUser;

        this.username = rawUser.username;
        this.publicFlags = rawUser.public_flags;
        this.id = rawUser.id;
        this.globalName = rawUser.globalName;
        this.discriminator = rawUser.discriminator;
        this.clan = rawUser.clan;
        // this.avatar
    }
}

module.exports = {
    Event,
    Command,
    CommandOption,
    Application,
    Member,
    User
}