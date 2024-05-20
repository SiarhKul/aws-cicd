import {handler} from "../services/hello";

describe('should return 200', () => {
  test('SQS Queue Created', async () => {
    const result = await handler({}, {})
    expect(result.statusCode).toBe(200)
  });
});

