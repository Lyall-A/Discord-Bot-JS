const { utils, config } = globals;

module.exports = class extends utils.Event {
    constructor() {
        super("interaction_create");
    }

    async run(client, interaction) {
        console.log(interaction)
        // utils.logger.info("Bot online:"/*, client.user.username*/);
        utils.logger.info("ah");
    }
}