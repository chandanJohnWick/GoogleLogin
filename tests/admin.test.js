

const request = require('supertest');
const app = require('../app'); 
const { adminUser } = require('../routes/admin');

test('should register a new admin user and return a token', async () => {
    const user = {
      name: 'John Doe',
      email: 'john@example.com',
      
    };
  
    const res = await request(app)
      .post('/admin/register')
      .send(user);
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  
    
    await adminUser.deleteOne({ email: user.email });
  });
  
  test('should return an error if the user is already registered', async () => {
    const user = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    };
  

    await adminUser.create(user);
  
    const res = await request(app)
      .post('/admin/register')
      .send(user);
  
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe('user is registered');
  
    
    await adminUser.deleteOne({ email: user.email });
  });
  