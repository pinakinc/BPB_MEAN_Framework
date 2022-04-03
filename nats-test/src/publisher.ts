const nats = require('node-nats-streaming');
const stan = nats.connect('blog','abc',{
    url:'http://localhost:4222'});

    stan.on('connect',()=>{
        console.log('Listener connected to Nats');
        const data = JSON.stringify({
            id:'123',
            title: 'concert',
            price: '30'
        });
    
        stan.publish('comment:created',data,()=>{
            console.log('Event published');
        })
    });
    