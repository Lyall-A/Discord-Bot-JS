// TODO: everything
const { utils } = globals;

module.exports = class extends utils.Command {
    constructor() {
        super("ban", "Ban a user", [
            {
                name: "user",
                description: "The user to ban",
                type: utils.discord.applicationCommandOptionTypes["USER"],
                required: true,
            }
        ]);
    }

    async run() {
        console.log("/ban")
    }
}