import nats from 'node-nats-streaming';
const stan = nats.connect('posts','abc',{
    url:'http://127.0.0.1:4222'
});

stan.on('connect',()=>{
    console.log('Publisher connected to nats');
})