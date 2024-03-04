const mqtt = require("mqtt");

class Client {
    client;

    connect(url, options = {}) {
        return new Promise((resolve) => {
            this.client = mqtt.connect(url, options);
            this.client.on("connect", () => {
                resolve(this);
            });
        });
    }

    subscribe(topic, onMessage) {
        this.client.on("message", (topic, message) => {
            onMessage(topic, message);
        });
        return new Promise((resolve, reject) => {
            this.client.subscribe(topic, (err) => {
                if (err) {
                    reject('could not subscribe');
                }
                resolve();
            });
        });
    }

    publish(topic, message) {
        this.client.publish(topic, message);
    }

    close() {
        this.client.end();
    }
}

module.exports = Client;