// TODO: everything
const { utils } = globals;

module.exports = class extends utils.Command {
    constructor() {
        super("ban", "Ban a user");
    }

    async run() {
        console.log("/ban")
    }
}