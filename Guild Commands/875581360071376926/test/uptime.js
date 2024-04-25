module.exports = class extends utils.Command {
    constructor() {
        super("uptime", "Get bot uptime");
    }

    async run() {
        console.log("/uptime")
    }
}