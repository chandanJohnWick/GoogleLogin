const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


const req = {
  header: jest.fn().mockReturnValue('dummy-token'),
  adminuser: null,
};
const res = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};
const next = jest.fn();


jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ adminId: 'dummy-admin-id' }),
}));

describe('Auth Middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should extract the token from the request header', () => {
    auth(req, res, next);

    expect(req.header).toHaveBeenCalledWith('x-auth-token');
  });

  it('should return 401 if no token is provided', () => {
    req.header.mockReturnValueOnce(undefined);

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('access denied. No token provided');
    expect(next).not.toHaveBeenCalled();
  });

  it('should verify and decode a valid token', () => {
    auth(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('dummy-token', process.env.PRIVATE_KEY);
    expect(req.adminuser).toEqual({ adminId: 'dummy-admin-id' });
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 for an invalid token', () => {
    jwt.verify.mockImplementationOnce(() => {
      throw new Error('Invalid token');
    });

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Invalid token');
    expect(next).not.toHaveBeenCalled();
  });
});
