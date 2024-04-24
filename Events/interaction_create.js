const { utils, config } = globals;

module.exports = class extends utils.Event {
    constructor() {
        super("interaction_create");
    }

    async run(client, interaction) {
        // console.log(interaction)
        // TODO: test
        console.log("responding");
        interaction.respond().then(i => console.log("I have responded"));
    }
}