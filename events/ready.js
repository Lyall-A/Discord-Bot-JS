// TODO: everything
module.exports = class extends Event {
    constructor() {
        super("ready");
    }

    async run() {
        console.log("ready!!!!")
    }
}