const Client = require('./client');

async function main() {
    const client = new Client();
    await client.connect('mqtt://localhost', {clientId: 'subscriber'});
    await client.subscribe('announce', (topic, message) => {
        console.log(`received ${message.toString()} on ${topic}`);
    });
}

main().then(() => {
    console.log('done!');
}).catch((err) => {
    console.log(err);
})