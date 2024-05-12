import { APIGatewayEvent } from 'aws-lambda';
import { internalCorsServerError, validCorsRequest } from './responses';

export default class GuestHandler {
  event: APIGatewayEvent;

  logger: any;
  constructor({ event }) {
    this.event = event;
    this.logger = console;
  }

  async findGuests(input) {
    console.log('Find guests', input);
    return [
      {
        id: '123456',
        name: 'Michi',
        table: 'FIRE',
      }
    ];
  }

  async updateGuest(guest: any) {
    console.log('Update guest', guest);
    return [1];
  }

  async handle() {
    try {
      this.logger.debug({ message: 'Received event', event: this.event });
      let res = {} as any;
      switch (this.event.resource) {
        case '/guests/find': {
          const body = JSON.parse(this.event.body as string);
          res = await this.findGuests(body);
          break;
        }
        case '/guests/update': {
          const body = JSON.parse(this.event.body as string) as any;
          res = await this.updateGuest(body);
          break;
        }
        default: {
          this.logger.debug(`Resource ${this.event.resource} not associated with any logic.`);
        }
      }
      return validCorsRequest(res);
    } catch (err) {
      const errorMessage = 'Some error occurred!';
      // eslint-disable-next-line no-console
      console.error(errorMessage, err.message);
      return internalCorsServerError(errorMessage);
    }
  }
}
