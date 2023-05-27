import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtAuthDto } from '../dto/jwt-auth.dto';

const { SECRET = 'secret' } = process.env;

const extractFromCookie = (req: any): string | null => {
  console.log(req.cookie);
  console.log(`Request path: "${req.path}"`, req.cookies);
  if (req && req.cookies) return req.cookies['jwt'];
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: extractFromCookie,
      secretOrKey: SECRET,
    });
  }

  async validate(jwtAuthDto: JwtAuthDto): Promise<any> {
    console.log('validation successful, jwtAuthDto: ', jwtAuthDto);
    return jwtAuthDto;
  }
}
