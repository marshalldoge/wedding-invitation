import { APIGatewayEvent } from 'aws-lambda';
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
import { internalCorsServerError, validCorsRequest } from './responses';

export default class GuestHandler {
  event: APIGatewayEvent;

  logger: any;
  constructor({ event }) {
    this.event = event;
    this.logger = console;
  }

  async findGuests(input) {
    const params = {
      TableName: process.env.GUEST_DYNAMO_DB_TABLE_NAME,
    } as any;

    const scanResults = [] as any[];
    let items;
    do{
      items = await docClient.scan(params).promise();
      items.Items.forEach((item) => scanResults.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey !== 'undefined');

    return scanResults;
  }

  async createGuest(guest: any) {
    try {
      const params = {
        TableName : process.env.GUEST_DYNAMO_DB_TABLE_NAME,
        Item: guest
      };
      await docClient.put(params).promise();
      return { body: 'Successfully created guest!' };
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateGuest(guest: any) {
    console.log('Update guest', guest);
    return [1];
  }

  async handle() {
    try {
      this.logger.debug({ message: 'Received event', event: this.event });
      let res = {} as any;
      switch (this.event.path) {
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
        case '/guests/create': {
          const body = JSON.parse(this.event.body as string) as any;
          res = await this.createGuest(body);
          break;
        }
        default: {
          this.logger.debug(`Resource ${this.event.path} not associated with any logic.`);
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
