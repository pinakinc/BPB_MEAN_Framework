import request from 'supertest';
import {post_app} from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

it('if the provided id does not exist returns a 404 ', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
//    console.log('generated id'+id);
//    console.log('generated path'+`/api/posts/${id}`);
    const response = await request(post_app)
        .put(`/api/posts/${id}`)
        .set('Cookie',global.signintoapp())
        .send({
            title:'My_Title',
            content: 'My_content'
        })
        //console.log('response status'+ response.status);

        .expect(404);
        
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(post_app)
        .put(`/api/posts/${id}`)
        .send({
            title:'My Title',
            content: 'My content'
        })
        .expect(401);    
});

it('returns a 401 if the user does not own the post', async () => {
    const response = await request(post_app)
        .post('/api/posts')
        .set('Cookie',global.signintoapp())
        .send({
            title: 'My Title',
            content: 'My Content'
        });
        await request(post_app)
        .put(`/api/posts/${response.body.id}`)
        .set('Cookie',global.signintoapp())
        .send({
            title: 'My new Title',
            content: 'My new Content'
        })
        .expect(401);
});


it('returns a 400 if the user provides an invalid title or content', async () => {
    const cookie = global.signintoapp();
    const response = await request(post_app)
    .post('/api/posts')
    .set('Cookie',cookie)
    .send({
        title: 'My Title',
        content: 'My Content'
    });

    await request(post_app)
    .put(`/api/posts/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
        title: '',
        content: 'My Content'
    })
    .expect(400);

    await request(post_app)
    .put(`/api/posts/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
        title: 'My title',
        content: ''
    })
    .expect(400);

});

it('updates the post when valid inputs are provided', async () => {
    const cookie = global.signintoapp();
    const response = await request(post_app)
    .post('/api/posts')
    .set('Cookie',cookie)
    .send({
        title: 'My Title',
        content: 'My Content'
    });
    
    await request(post_app)
    .put(`/api/posts/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
        title: 'New Title',
        content: 'New Content'
    })
    .expect(200);

    const ticketResponse = await request(post_app)
                            .get(`/api/posts/${response.body.id}`)
                            .send();
   // console.log('hi'+ticketResponse.body.title);
    expect(ticketResponse.body.title).toEqual('New Title');
    expect(ticketResponse.body.content).toEqual('New Content');
});

it('publishes an event', async () => {
    const cookie = global.signintoapp();
    const response = await request(post_app)
    .post('/api/posts')
    .set('Cookie',cookie)
    .send({
        title: 'My Title',
        content: 'My Content'
    });
    
    await request(post_app)
    .put(`/api/posts/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
        title: 'New Title',
        content: 'New Content'
    })
    .expect(200);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
})