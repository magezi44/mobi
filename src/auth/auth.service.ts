import { Injectable } from '@nestjs/common';
import { SignUpsService } from 'src/sign-ups/sign-ups.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateSignUpDto } from 'src/sign-ups/dto/create-sign-up.dto';
import { create } from 'domain';
import { access } from 'fs';


@Injectable()
export class AuthService {
  static signup(createSignUpDto: CreateSignUpDto) {
    throw new Error('Method not implemented.');
  }
    constructor(private signUpsService: SignUpsService,
                private jwtService: JwtService,
        ) {}


        

    async validateUser(phone: string, password: string): Promise<any> {
        const user = await this.signUpsService.findOneByPhone(phone);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
         return null;
    }
    
    async login(user: any) {
        const payload = { phone: user.phone, sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        return {
          access_token: accessToken,
        };
      }
}

