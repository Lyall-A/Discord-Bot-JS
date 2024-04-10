// TODO: everything
const { utils } = globals;

module.exports = class extends utils.Command {
    constructor() {
        super("ping", "Test response times");
    }

    async run() {
        console.log("/ping")
    }
}