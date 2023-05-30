import { Controller, Request, Post, UseGuards, Get, Body, ValidationPipe, ClassSerializerInterceptor, UseInterceptors, UploadedFile, UnauthorizedException } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SignUpsService } from './sign-ups/sign-ups.service';
import { CreateSignUpDto } from './sign-ups/dto/create-sign-up.dto';
import { AuthDto } from './auth/auth-dto/auth.dto';
import { UsePipes } from '@nestjs/common';
import { SignUpEntity } from './sign-ups/entities/sign-up.entity';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AppController {
  jwtService: any;
  getHello: any;
  constructor(private authService: AuthService,
    private signUpsService: SignUpsService,
    private appService: AppService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Logs user into system' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone: {
          type: 'string',
          example: 'username@gmail.com',
          description: 'Phone of the user',
        },
        password: {
          type: 'string',
          example: 'User@1232450',
          description: 'Password of the user',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successful',
  })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async login(@Body('phone') phone: string, @Body('password') password: string): Promise<any> {
    const user = await this.authService.validateUser(phone, password);
    if (user) {
      const token = await this.authService.login(user);
      const message = 'Login successful';
      return { message, token };
    } else {
      // Handle authentication failure
      throw new UnauthorizedException('Invalid credentials');
    }
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  @ApiOperation({ summary: 'Registers user into system' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          example: 'Jane',
          description: 'User full name',
        },
        lastName: {
          type: 'string',
          example: 'Doe',
          description: 'User full name',
        },
        country: {
          type: 'string',
          example: 'Uganda',
          description: 'Country of the user',
        },
        email: {
          type: 'string',
          example: 'username@gmail.com',
          description: 'Email of the user',
        },
        phone: {
          type: 'string',
          example: '0789 234 890',
          description: 'Phone number of the user',
        },
        password: {
          type: 'string',
          example: 'User@1232450',
          description: 'Password of the user',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successful',
  })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async create(@Body(new ValidationPipe()) createSignUpDto: CreateSignUpDto): Promise<SignUpEntity> {
    return new SignUpEntity(await this.signUpsService.create(createSignUpDto));
  }


  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getDashboard(@Request() req) {
  //   return req.user;

  // }
}

