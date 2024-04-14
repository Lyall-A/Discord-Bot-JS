// TODO: everything
const os = require("os");

const { utils, config } = globals;

module.exports = class extends utils.Event {
    constructor() {
        super("ready");
    }

    async run(client) {
        // utils.logger.info("Bot online:"/*, client.user.username*/);
        utils.logger.info("Bot online");
        // TODO: make embed better
        // await utils.discord.sendMessage(config.channels.status, null, [{
        //     title: "Online",
        //     description: `${client.user.username} is now online`,
        //     fields: [
        //         {
        //             name: "Date",
        //             value: new Date().toLocaleString(),
        //         },
        //         // {
        //         //     name: "Guilds",
        //         //     value: client.guilds.length.toString(),
        //         // },
        //         {
        //             name: "Gateway connect time",
        //             value: client.gateway.connectTime.toString() + "ms",
        //             // inline: true
        //         },
        //         {
        //             name: "Gateway authorize time",
        //             value: client.readyTime.toString() + "ms",
        //             // inline: true
        //         },
        //         {
        //             name: "Runtime",
        //             value: process.title,
        //             // inline: true
        //         },
        //         {
        //             name: "Architecture",
        //             value: os.arch(),
        //             // inline: true
        //         },
        //         {
        //             name: "OS",
        //             value: `${os.type()} (${os.version()})`,
        //             // inline: true
        //         },
        //         {
        //             name: "CPU",
        //             value: `x${os.cpus().length} ${os.cpus()[0].model}`,
        //             // inline: true
        //         },
        //         {
        //             name: "Uptime",
        //             value: `${Math.floor(os.uptime() / 86400)} days`,
        //             // inline: true
        //         }
        //     ],
        //     color: utils.hexToDec("00ff1b")
        // }]);
    }
}