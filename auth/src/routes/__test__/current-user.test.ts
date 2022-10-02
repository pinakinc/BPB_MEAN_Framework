import request from 'supertest';
import {app} from '../../app';

it('Responds with current user details', async ()=> {

    
    
    const cookie = await global.signin();
    
    //const authResponse = await request(app)
    //    .post('/api/users/signup')
    //    .send({
    //        email: "test@test.com",
    //        password: "password"
    //    })
    //    .expect(201);

    //const cookie = authResponse.get('Set-Cookie');
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie',cookie)
        .send()
        .expect(200);
    
//    console.log("ye hai"+response.body.toString());
    expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('Response is null if not authenticated', async ()=> {

    
    
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);
   // console.log(response.body);
    expect(response.body.currentUser).toEqual(null);
});
