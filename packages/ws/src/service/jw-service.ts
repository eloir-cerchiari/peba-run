import jwt from 'jsonwebtoken';

export class JwtService {
  generate(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  }

  async verify(token: string): Promise<any> {
	return jwt.verify(token, process.env.JWT_SECRET);
  }
}


export function makeJwtService(): JwtService {
	  return new JwtService();
}