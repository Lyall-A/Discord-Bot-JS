module.exports = class {
    constructor(name, description, options, additionalFields) {
        this.commandName = name;
        this.commandDescription = description;
        this.commandOptions = options || [ ];
        this.commandAdditionalFields = additionalFields || { };
    }
}