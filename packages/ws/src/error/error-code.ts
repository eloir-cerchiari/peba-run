export enum ErrorCode {
  // 1000 - 1999: General
  General = 1000,
  // 2000 - 2999: Authentication
  Authentication = 2000,
  AuthenticationOnGenerateJwt = 2001,
  AuthenticationOnValidateJwt = 2002,
  LoginUserOnStrava = 2003,
  AuthenticationOnStrava = 2004,
  // 3000 - 3999: Authorization
  Authorization = 3000,
  // 4000 - 4999: Validation
  Validation = 4000,
  // 5000 - 5999: Database
  Database = 5000,
  DatabaseRegistryNotFound = 5001,
  DatabaseRegistryAlreadyExists = 5002,
  DatabaseRegistryNotUpdated = 5003,
  DatabaseRegistryNotDeleted = 5004,
  DatabaseRegistryNotCreated = 5005,
  // 6000 - 6999: File
  File = 6000,
  // 7000 - 7999: Email
  Email = 7000,
  // 8000 - 8999: Payment
  Payment = 8000,
  // 9000 - 9999: SMS
  Sms = 9000,
  // 10000 - 10999: Push Notification
  PushNotification = 10000,
  // 11000 - 11999: Websocket
  Websocket = 11000,
  // 12000 - 12999: GraphQL
  GraphQL = 12000,
  // 13000 - 13999: Input
  Input = 13000,
  InvalidInput = 13001,
}
