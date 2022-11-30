import { PubSub } from './PubSub';
import { PubSubError } from './PubSubErrors';

describe('PubSub', () => {
  let pubSub;
  beforeEach(() => {
    jest.clearAllMocks();
    pubSub = new PubSub();
  });

  it('should not allow subscribing without an event name', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const subscribeWithoutEventName = () => pubSub.subscribe('', () => {});
    const expectedError = new PubSubError('Invalid event name');
    expect(subscribeWithoutEventName).toThrow(expectedError);
  });

  it('should not allow subscribing without a function', () => {
    const subscribeWithoutFunction = () => pubSub.subscribe('testEvent');
    const expectedError = new PubSubError('Invalid callback function');
    expect(subscribeWithoutFunction).toThrow(expectedError);
  });

  it('should run subscriptions callbacks after publishing', () => {
    const callback = jest.fn();
    pubSub.subscribe('testEvent', callback);
    pubSub.publish('testEvent', 'payload');
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('payload');
  });

  it('should run the callbacks in the correct order of subscription', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    pubSub.subscribe('testEvent', callback1);
    pubSub.subscribe('testEvent', callback2);
    pubSub.publish('testEvent', 'payload');
    expect(callback1).toHaveBeenCalledWith('payload');
    expect(callback2).toHaveBeenCalledWith('payload');
    const cb1Order = callback1.mock.invocationCallOrder[0];
    const cb2Order = callback2.mock.invocationCallOrder[0];
    expect(cb1Order).toBeLessThan(cb2Order);
  });

  it('should not run callbacks after unsubscribing', () => {
    const callback = jest.fn();
    pubSub.subscribe('testEvent', callback);
    pubSub.unsubscribe('testEvent', callback);
    pubSub.publish('testEvent', 'payload');
    expect(callback).not.toHaveBeenCalled();
  });

  it('should clear all subscriptions for a specific event', () => {
    const eventCallback1 = jest.fn();
    const eventCallback2 = jest.fn();
    pubSub.subscribe('testEvent', eventCallback1);
    pubSub.subscribe('testEvent', eventCallback2);
    pubSub.unsubscribe('testEvent');
    pubSub.publish('testEvent', 'payload');
    expect(eventCallback1).not.toHaveBeenCalled();
    expect(eventCallback2).not.toHaveBeenCalled();
  });

  it('should clear all subscriptions', () => {
    const event1Callback1 = jest.fn();
    const event1Callback2 = jest.fn();
    const event2Callback1 = jest.fn();
    const event2Callback2 = jest.fn();
    pubSub.subscribe('event1', event1Callback1);
    pubSub.subscribe('event1', event1Callback2);
    pubSub.subscribe('event2', event2Callback1);
    pubSub.subscribe('event2', event2Callback2);
    pubSub.unsubscribeFromAll();
    pubSub.publish('event1', 'payload1');
    pubSub.publish('event2', 'payload2');
    expect(event1Callback1).not.toHaveBeenCalled();
    expect(event1Callback2).not.toHaveBeenCalled();
    expect(event2Callback1).not.toHaveBeenCalled();
    expect(event2Callback2).not.toHaveBeenCalled();
  });

  it('should not throw error when unsubscribing to random events', () => {
    const unsubscribeEventName = () => pubSub.unsubscribe('random');
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const unsubscribeCallback = () => pubSub.unsubscribe('random', () => {});
    expect(unsubscribeEventName).not.toThrow(expect.any(Error));
    expect(unsubscribeCallback).not.toThrow(expect.any(Error));
  });

  it('should not throw error when unsubscribing to random callbacks', () => {
    const realCallback = jest.fn();
    const randomCallback = jest.fn();
    const unsubscribeToRandomCallback = () => {
      pubSub.unsubscribe('testEvent', randomCallback);
    };
    pubSub.subscribe('testEvent', realCallback);
    pubSub.unsubscribe('testEvent', randomCallback);
    expect(unsubscribeToRandomCallback).not.toThrow(expect.any(Error));
  });

  it('should not throw error when publishing with random event names', () => {
    const publishWithRandomEventName = () => pubSub.publish('random', 'data');
    expect(publishWithRandomEventName).not.toThrow(expect.any(Error));
  });
});
