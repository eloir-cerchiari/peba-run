import { DynamoDB } from 'aws-sdk';
import { DefaultError } from '../error/default-error';
import { Athlete } from '../model/athlete';
import { ErrorCode } from '../error/error-code';
import { DbError } from '../error/db-error';
export class AthleteRepository {
  private dynamoDb: AWS.DynamoDB.DocumentClient = new DynamoDB.DocumentClient();
  private readonly tableName: string = 'Athlete';
  constructor() {}

  async insert(athlete: Athlete): Promise<Athlete> {
    try {
      athlete.id = athlete.id.toString();
      const params = {
        TableName: this.tableName,
        Item: athlete,
      };

      await this.dynamoDb.put(params).promise();

      return athlete;
    } catch (error) {
      throw new DbError(
        `I could not save the athlete`,
        ErrorCode.DatabaseRegistryNotCreated,
        error.stack,
        [`Error inserting athlete: ${athlete}`, error.message]
      );
    }
  }

  async get(id: string): Promise<Athlete> {
    const params = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };
    try {
      const result = await this.dynamoDb.get(params).promise();

      return result.Item as Athlete;
    } catch (error) {
      throw new DbError(
        `Error getting athlete by ID`,
        ErrorCode.DatabaseRegistryNotFound,
        error.stack,
        [`Error getting athlete by ID: ${id}`, error.message]
      );
    }

    return {} as Athlete;
  }
}

export function makeAthleteRepository(): AthleteRepository {
  return new AthleteRepository();
}
