const clientGen = require('./client');

async function main() {
    let count = 0;
    const i = setInterval(
        () => {
            const client1 = clientGen();
            fire(client1);
            count++;
            if (count >= 10) {
                clearInterval(i);
            }
        },
        500
    );
        
}

async function fire(client1) {
    await client1.connect('mqtt://localhost');
    await client1.subscribe('topic', (topic, message) => {
        console.log(`received ${message.toString()} on ${topic}`);
    });
    await client1.publish('topic', 'hello!');
    await client1.close();
}

main().then(() => {
    console.log('done!');
}).catch((err) => {
    console.log(err);
})
