import request from 'supertest';
import {app} from '../../app';
import {Post} from '../../models/posts';

it('has a route handler listening to /api/posts for post requests', async () => {
    const response = await request(app)
                        .post('/api/posts')
                        .send({});
    expect (response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    const response = await request(app)
                        .post('/api/posts')
                        .send({})
                        .expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
                        .post('/api/posts')
                        .set('Cookie',global.signin())
                        .send({
                            title: 'title',
                            content: 'content'
                        });
    //console.log(response.status);
    expect(response.status).not.toEqual(401);
});

it('it returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/posts')
        .set('Cookie',global.signin())
        .send({
            title: '',
            content: 'some'
        })
        .expect(400);
    
    await request(app)
        .post('/api/posts')
        .set('Cookie',global.signin())
        .send({
            content: 'some'
        })
        .expect(400);
});

it('returns an error if an empty content is provided', async () => {
    await request(app)
    .post('/api/posts')
    .set('Cookie',global.signin())
    .send({
        title: 'my title',
        content: ''
    })
    .expect(400);

await request(app)
    .post('/api/posts')
    .set('Cookie',global.signin())
    .send({
        title: 'my title'
    })
    .expect(400);


});

it('creates a post when valid inputs are provided', async () => {
    let posts = await Post.find({});
    expect (posts.length).toEqual(0);
    await request(app)
        .post('/api/posts')
        .set('Cookie',global.signin())
        .send({
            title: 'my title',
            content: 'my content'
        })
        .expect(201);
    
    posts = await Post.find({});
    expect (posts.length).toEqual(1);

});