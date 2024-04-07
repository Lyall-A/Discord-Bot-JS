// TODO: everything

const { utils } = globals;

module.exports = class extends utils.Event {
    constructor() {
        super("ready");
    }

    async run(client) {
        utils.logger.info("Bot online:", client.user.username)
    }
}