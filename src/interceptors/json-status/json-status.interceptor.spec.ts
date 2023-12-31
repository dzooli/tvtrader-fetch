import { JSONStatusInterceptor } from './json-status.interceptor';

describe('HttpStatusInterceptor', () => {
  it('should be defined', () => {
    expect(new JSONStatusInterceptor()).toBeDefined();
  });
});
