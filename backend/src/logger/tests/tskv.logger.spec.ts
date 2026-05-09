import { TskvLogger } from '../tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call console.log with TSKV formatted message', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('test message');

    expect(consoleSpy).toHaveBeenCalledTimes(1);

    const loggedMessage = consoleSpy.mock.calls[0][0];

    expect(loggedMessage).toContain('level=log');
    expect(loggedMessage).toContain('message=test message');
    expect(loggedMessage).toContain('timestamp=');
  });

  it('should call console.error with TSKV formatted message', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    logger.error('error message');

    expect(consoleSpy).toHaveBeenCalledTimes(1);

    const loggedMessage = consoleSpy.mock.calls[0][0];

    expect(loggedMessage).toContain('level=error');
    expect(loggedMessage).toContain('message=error message');
  });

  it('should support optional params', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('message', { id: 1 });

    const loggedMessage = consoleSpy.mock.calls[0][0];

    expect(loggedMessage).toContain('optionalParams=[{"id":1}]');
  });
});
