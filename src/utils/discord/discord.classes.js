const constants = require("./discord.constants");
// const functions = require("./discord.functions");

const { intents, gatewayOpcodes, gatewayCloseEventCodes, applicationCommandTypes, voiceOpcodes, voiceCloseEventCodes, applicationCommandOptionTypes } = constants;

module.exports = {
    Event: class {

    },

    // TODO: idk what im doing
    Command: class {
        constructor(rawCommand) {
            this._raw = rawCommand;

            this.id = this._raw.id;
            this.applicationId = this._raw.application_id;
            this.type = this._raw.type;
            this.typeString = Object.entries(applicationCommandTypes).find(([key, value]) => value == this._raw.type)?.[0];
            this.name = this._raw.name;
            this.description = this._raw.description;
            this.nsfw = this._raw.nsfw;
            this.options = this._raw.options ? this._raw.options.map(i => new CommandOption(i)) : null
        }
    },

    CommandOption: class {
        constructor(rawOption) {
            this._raw = rawOption;
            // TODO implement this from https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
        }
    },

    Application: class {
        // TODO
    }
}