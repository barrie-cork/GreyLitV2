import request from 'supertest';
import { app } from '../../src/app';
import { ValidationError } from '../../src/types';

describe('Error Handling Integration', () => {
  it('should handle validation errors correctly', async () => {
    const error = new ValidationError('Invalid input');
    const mockRoute = jest.fn().mockImplementation(() => {
      throw error;
    });

    app.get('/test-error', mockRoute);

    const response = await request(app).get('/test-error');
    
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input'
      }
    });
  });

  it('should handle unexpected errors with 500 status', async () => {
    const mockRoute = jest.fn().mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    app.get('/test-unexpected', mockRoute);

    const response = await request(app).get('/test-unexpected');
    
    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      }
    });
  });
});
