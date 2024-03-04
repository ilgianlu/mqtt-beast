const Client = require('./client');

async function main() {
    const client = new Client();
    await client.connect('mqtt://localhost', {
        clientId: 'retain2',
        will: {
            topic: 'announce',
            payload: 'hi I am retain2',
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