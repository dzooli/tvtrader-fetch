import { HttpStatusInterceptor } from './http-status.interceptor';

describe('HttpStatusInterceptor', () => {
  it('should be defined', () => {
    expect(new HttpStatusInterceptor()).toBeDefined();
  });
});
