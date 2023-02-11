import jwt from 'jsonwebtoken';

export class JwtService {
  constructor(
    private params: {
      jwtSecret?: string;
      expireTimeInDays?: number;
    }
  ) {
    this.params = {
      jwtSecret: params.jwtSecret || process.env.JWT_SECRET,
      expireTimeInDays: params.expireTimeInDays || 30,
    };
  }

  generate(userId: string): string {
    return jwt.sign({ userId }, this.params.jwtSecret, {
      expiresIn: `${this.params.expireTimeInDays}d`,
    });
  }

  async verify(token: string): Promise<any> {
    return jwt.verify(token, this.params.jwtSecret);
  }
}

export function makeJwtService(): JwtService {
  return new JwtService({
    jwtSecret: process.env.JWT_SECRET,
    expireTimeInDays: 30,
  });
}
