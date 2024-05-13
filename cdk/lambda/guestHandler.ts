import { APIGatewayEvent } from 'aws-lambda';
import { internalCorsServerError, validCorsRequest } from './responses';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient, GetCommand,
  PutCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';

const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export default class GuestHandler {
  event: APIGatewayEvent;

  logger: any;
  constructor({ event }) {
    this.event = event;
    this.logger = console;
  }

  async findAllGuests(guest: any) {
    const params = {
      TableName: process.env.GUEST_DYNAMO_DB_TABLE_NAME,
      Select: 'ALL_ATTRIBUTES',
    } as any;

    const scanResults = [] as any[];
    let items;
    do{
      const command = new ScanCommand(params);
      items = await docClient.send(command);
      items.Items.forEach((item) => scanResults.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey !== 'undefined');

    return scanResults;
  }

  async findGuest(guest: any) {
    const TableName = process.env.GUEST_DYNAMO_DB_TABLE_NAME;
    const params = new GetCommand({
      TableName,
      Key: {
        id: guest.id,
      },
    });
    const data = await docClient.send(params);
    this.logger.info('Retrieved data from guest table', { data });
    return data.Item || {};
  }

  async createGuest(guest: any) {
    const params = new PutCommand({
      TableName: process.env.GUEST_DYNAMO_DB_TABLE_NAME,
      Item: guest,
    });
    try {
      return docClient.send(params);
    } catch (error) {
      this.logger.error('Error in inserting unique guest id', { error });
    }
  }

  async updateGuest(guest: any) {
    const params = new PutCommand({
      TableName: process.env.GUEST_DYNAMO_DB_TABLE_NAME,
      Item: guest,
    });
    try {
      return docClient.send(params);
    } catch (error) {
      this.logger.error('Error in updating unique guest id', { error });
    }
  }

  async handle() {
    try {
      this.logger.debug({ message: 'Received event', event: this.event });
      let res = {} as any;
      switch (this.event.path) {
        case '/guests/findAll': {
          const body = JSON.parse(this.event.body as string);
          res = await this.findAllGuests(body);
          break;
        }
        case '/guests/find': {
          const body = JSON.parse(this.event.body as string);
          res = await this.findGuest(body);
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
