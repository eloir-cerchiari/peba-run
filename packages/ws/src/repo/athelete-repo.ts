import { DynamoDB } from 'aws-sdk';
import { Athlete } from '../model/athlete';

export class AthleteRepository {
  private dynamoDb: AWS.DynamoDB.DocumentClient = new DynamoDB.DocumentClient();
  private readonly tableName: string = 'Athlete';
  constructor() {}

  async insert(athlete: Athlete): Promise<Athlete> {
    athlete.id = athlete.id.toString();
    const params = {
      TableName: this.tableName,
      Item: athlete,
    };

    await this.dynamoDb.put(params).promise();

    return athlete;
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
      console.log(error?.message);
    }

    return {} as Athlete;
  }
}
