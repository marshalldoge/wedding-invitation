import GuestHandler from './guestHandler';

export const handler = async (event?: Record<string, any>, context?: Record<string, any>) => {
  const eventHandler = new GuestHandler({ event });
  return eventHandler.handle();
};
