// TODO: everything

const { utils, config } = globals;

module.exports = class extends utils.Event {
    constructor() {
        super("ready");
    }

    async run(client) {
        utils.logger.info("Bot online:", client.user.username);
        await utils.discord.sendMessage(config.channels.status, null, [{
            title: "Online",
            description: `${client.user.username} is now online`,
            fields: [
                {
                    name: "Date",
                    value: new Date().toLocaleString(),
                },
                {
                    name: "Guilds",
                    value: client.guilds.length.toString(),
                },
                {
                    name: "Gateway connect time",
                    value: client.gateway.connectTime.toString() + "ms",
                    inline: true
                },
                {
                    name: "Gateway authorize time",
                    value: client.readyTime.toString() + "ms",
                    inline: true
                }
            ],
            color: utils.hexToDec("00ff1b")
        }]);
    }
}