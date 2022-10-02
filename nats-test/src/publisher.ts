import {PostCreatedPublisher} from './events/post-created-publisher';
import nats from 'node-nats-streaming';
console.clear();
const stan = nats.connect('blog','def',{
    url:'http://localhost:4222'});

    stan.on('connect',async ()=>{
        console.log('Publisher connected to Nats');

        const data = JSON.stringify({
            id:'123',
            title: 'concert',
            content: 'buys concert'
        });
    
        stan.publish('post:created',data,()=>{
            console.log('Event published');
        });


//        const publisher = new PostCreatedPublisher(stan);
//        try {
//        await publisher.publish({
//            id: '123',
//            title: 'New entries from Automation Geek',
//            content: 'New entries added',
            
//        });
//    } catch (err){
//        console.error(err);
    });
        
    