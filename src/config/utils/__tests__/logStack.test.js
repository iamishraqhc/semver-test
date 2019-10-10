import mocha from 'mocha';
import { assert } from 'chai';
import logStack from '../logStack';

const { describe, it } = mocha;

describe('logStack', () => {
  it('should contain an empty stack when no log messages has been applied', () => {
    const logger = logStack();

    const stack = logger.getStack();
    assert.equal(stack.length, 0);
  });
  it('should contain an info log message when using the info log function', () => {
    const logger = logStack();
    logger.info('Info message');

    const stack = logger.getStack();
    assert.equal(stack.length, 1);
    assert.equal(stack[0].level, 'info');
  });
  it('should contain a warn log message when using the warn log function', () => {
    const logger = logStack();
    logger.warn('Warn message');

    const stack = logger.getStack();
    assert.equal(stack.length, 1);
    assert.equal(stack[0].level, 'warn');
  });
  it('should contain an error log message when using the error log function', () => {
    const logger = logStack();
    logger.error('Error message');

    const stack = logger.getStack();
    assert.equal(stack.length, 1);
    assert.equal(stack[0].level, 'error');
  });
  it('should return log messages in the same order as used', () => {
    const logger = logStack();
    logger.info('Message 1');
    logger.warn('Message 2');
    logger.error('Message 3');

    const stack = logger.getStack();
    assert.equal(stack.length, 3);
    assert.deepEqual(stack[0], { level: 'info', message: 'Message 1' });
    assert.deepEqual(stack[1], { level: 'warn', message: 'Message 2' });
    assert.deepEqual(stack[2], { level: 'error', message: 'Message 3' });
  });
  it('should empty the log stack after flushing', () => {
    const logger = logStack();
    logger.info('Message 1');
    logger.warn('Message 2');
    logger.error('Message 3');

    const messages = [];
    logger.flush(message => {
      messages.push(message);
    });
    assert.equal(messages.length, 3);
    assert.deepEqual(messages[0], { level: 'info', message: 'Message 1' });
    assert.deepEqual(messages[1], { level: 'warn', message: 'Message 2' });
    assert.deepEqual(messages[2], { level: 'error', message: 'Message 3' });

    const stack = logger.getStack();
    assert.equal(stack.length, 0);
  });
});
