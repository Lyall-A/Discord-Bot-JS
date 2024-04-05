// TODO: everything
module.exports = class extends Command {
    constructor() {
        super("ban", "Ban a user");
    }

    async run() {
        console.log("/ban")
    }
}