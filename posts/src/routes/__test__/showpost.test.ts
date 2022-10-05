import request from 'supertest';
import {post_app} from '../../app';
import mongoose from 'mongoose';


it('returns a 404 if the post is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString;
    const response = await request(post_app)
        .get(`/api/posts/${id}`)
        .send();
        
});

it('returns the post if the post is found', async () => {
    const title = 'My blog';
    const content = 'some content';
    const response = await request(post_app)
        .post('/api/posts')
        .set('Cookie',global.signintoapp())
        .send({
            title,content
        })
        .expect(201);
    const postResponse = await request(post_app)
                            .get(`/api/posts/${response.body.id}`)
                            .send()
                            .expect(200);
    expect(postResponse.body.title).toEqual(title);
    expect(postResponse.body.content).toEqual(content);


});