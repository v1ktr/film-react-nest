import { JsonLogger } from '../json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call console.log with formatted JSON message', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('test message');

    expect(consoleSpy).toHaveBeenCalledTimes(1);

    const loggedMessage = consoleSpy.mock.calls[0][0];

    expect(typeof loggedMessage).toBe('string');

    const parsed = JSON.parse(loggedMessage);

    expect(parsed.level).toBe('log');
    expect(parsed.message).toBe('test message');
    expect(parsed.optionalParams).toEqual([]);
    expect(parsed.timestamp).toBeDefined();
  });

  it('should call console.error with formatted JSON message', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    logger.error('error message');

    expect(consoleSpy).toHaveBeenCalledTimes(1);

    const loggedMessage = consoleSpy.mock.calls[0][0];

    const parsed = JSON.parse(loggedMessage);

    expect(parsed.level).toBe('error');
    expect(parsed.message).toBe('error message');
  });

  it('should support optional params', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('message', { id: 1 });

    const loggedMessage = consoleSpy.mock.calls[0][0];

    const parsed = JSON.parse(loggedMessage);

    expect(parsed.optionalParams).toEqual([{ id: 1 }]);
  });
});
