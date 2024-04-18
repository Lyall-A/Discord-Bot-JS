// TODO: everything
const { utils, config } = globals;

module.exports = class extends utils.Event {
    constructor() {
        super("ready");
    }

    async run(client) {
        utils.logger.info("Bot online:", client.user.username);
        // utils.logger.info("Bot online");
    }
}