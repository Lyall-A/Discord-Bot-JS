module.exports = class {
    constructor(name, description, options, additionalFields) {
        this.name = name;
        this.description = description;
        this.options = options || [ ];
        this.additionalFields = additionalFields || { };
    }
}