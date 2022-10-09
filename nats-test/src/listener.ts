import nats from 'node-nats-streaming';
import {randomBytes} from 'crypto';
import {PostCreatedListener} from './events/post-created-listener';
console.clear();

const stan = nats.connect('blog',randomBytes(4).toString('hex'),{
//randomBytes(4).toString('hex'),{
    url:'http://localhost:4222'
});



stan.on('connect',()=>{
    console.log('Listener connected to Nats');

     stan.on('close',()=>{
        console.log('NATS connection closed');
        process.exit();
    });
   /* const options = stan.subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('post-service');
    const subscription = stan.subscribe('post:created','queue-group-name',options);*/
    //console.log('Message');
    /*subscription.on('message',(msg: Message)=>{
        const data = msg.getData();

        if (typeof data === 'string') {
            console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
        }
        msg.ack();
    });*/
    

   
    new PostCreatedListener(stan).listen();
});

process.on('SIGINT',()=> stan.close());
process.on('SIGTERM',()=> stan.close());