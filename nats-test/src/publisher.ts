import {PostCreatedPublisher} from './events/post-created-publisher';
import nats from 'node-nats-streaming';
const stan = nats.connect('blog','abc',{
    url:'http://localhost:4222'});

    stan.on('connect',async ()=>{
        console.log('Publisher connected to Nats');

        const publisher = new PostCreatedPublisher(stan);
        try {
        await publisher.publish({
            id: '123',
            title: 'New entries from Automation Geek',
            content: 'New entries added',
            
        });
    } catch (err){
        console.error(err);
    }
        //const data = JSON.stringify({
        //    id:'123',
        //    title: 'concert',
        //    price: '30'
        //});
    
        //stan.publish('comment:created',data,()=>{
        //    console.log('Event published');
        //});
    });
    