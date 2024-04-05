// TODO: everything
module.exports = class extends Command {
    constructor() {
        super("ping", "Test response times");
    }

    async run() {
        console.log("piss")
    }
}