const Client = require('./client');

async function main() {
    for (let i = 0; i < 10; i++)
    {
        const client = new Client();
        await fire(client);
        await sleepAsync(500);
    }
}

const sleepAsync = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function fire(client) {
    await client.connect('ws://localhost:1080/ws');
    await client.subscribe('topic', (topic, message) => {
        console.log(`received ${message.toString()} on ${topic}`);
    });
    await client.publish('topic', 'hello!');
    await client.close();
}

main().then(() => {
    console.log('done!');
}).catch((err) => {
    console.log(err);
})
