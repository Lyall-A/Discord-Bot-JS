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
            if (event == "message") {
                this.conn.on("message", message => {
                    let json;
                    try { json = JSON.parse(message) } catch(err) { };
                    callback(json, message);
                });
            } else this.conn.on(event, callback);
        }

        send(message) {
            this.conn.send((this.options.json && typeof message == "object") ? JSON.stringify(message) : message);
        }

        close(code) {
            this.conn.close(code);
        }
    },
    server: class {

    }
}