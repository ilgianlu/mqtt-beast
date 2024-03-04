const Client = require('./client');

async function main() {
    const client = new Client();
    await client.connect('mqtt://localhost', {
        clientId: 'retain3',
        will: {
            topic: 'announce',
            payload: 'hi I am retain3',
            retain: true
        }
    });
    await client.subscribe('topic', (topic, message) => {
        console.log(`received ${message.toString()} on ${topic}`);
    });
}

main().then(() => {
    console.log('done!');
}).catch((err) => {
    console.log(err);
})