// TODO: remove ws dep + options like automatic JSON parsing/stringify
const ws = require("ws");
module.exports = {
    connection: class {
        constructor(url, options) {
            this.url = url;
            this.options = options;
            this.conn = new ws.WebSocket(url);
        }

        on(event, callback) {
            this.conn.on(event, callback);
        }

        send(message) {
            this.conn.send(message);
        }
    },
    server: class {

    }
}