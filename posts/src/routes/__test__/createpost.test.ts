import request from 'supertest';
import {app} from '../../app';

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
                        .send({});
    expect(response.status).not.toEqual(401);
});

it('it returns an error if an invalid title is provided', async () => {

});

it('returns an error if an empty content is provided', async () => {

});

it('creates a post when valid inputs are provided', async () => {

});