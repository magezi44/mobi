
import { Injectable } from '@nestjs/common';
import { CreateSignUpDto } from './dto/create-sign-up.dto';
import { UpdateSignUpDto } from './dto/update-sign-up.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as brypt from 'bcrypt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class SignUpsService {
  constructor(private prisma: PrismaService, private cloudinary: CloudinaryService) { }
  create(createSignUpDto: CreateSignUpDto) {
    const saltOrRounds = 10;
    const password = createSignUpDto.password;
    const salt = brypt.genSaltSync(saltOrRounds);
    const hash = brypt.hashSync(password, salt);
    createSignUpDto.password = hash;
    return this.prisma.signUp.create({
      data: {
        firstName: createSignUpDto.firstName,
        lastName: createSignUpDto.lastName,
        email: createSignUpDto.email,
        phone: createSignUpDto.phone,
        password: createSignUpDto.password,
      }
    });
  }

  findAll() {
    return this.prisma.signUp.findMany();
  }

  findOne(id: string) {
    return this.prisma.signUp.findUnique({ where: { phone: id }});

  }
  findOneByPhone(phone: string): Promise<any> {
    return this.prisma.signUp.findUnique({ where: { phone } });
  }

  
}
