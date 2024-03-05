const Client = require('./client');

async function main() {
    const p = [];
    for (let i = 0; i < 1; i++)
    {
        const client = new Client();
        p.push(fire(client, 1));
        await sleepAsync(Math.random() * 1000);
    }
    const r = await Promise.all(p);
}

const sleepAsync = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function fire(client, messageNo) {
    // await client.connect('ws://localhost:1080/ws');
    await client.connect('mqtt://localhost');
    await client.subscribe('topic', (topic, message) => {
        console.log(`received ${message.toString()} on ${topic}`);
    });
    await send(client, messageNo);
    
}

function send(client, count) {
    return new Promise((resolve) => {
        let n = 0;
        const i = setInterval(() => {
            client.publish('topic', `hello ${n}!`, {retain: true});
            n++;
            if (n > count) {
                clearInterval(i);
                client.close();
                resolve();
            }
        }, Math.random() * 500);
    });
}

main().then(() => {
    console.log('done!');
}).catch((err) => {
    console.log(err);
})
