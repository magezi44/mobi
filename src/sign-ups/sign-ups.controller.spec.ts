import { Test, TestingModule } from '@nestjs/testing';
import { SignUpsController } from './sign-ups.controller';
import { SignUpsService } from './sign-ups.service';

describe('SignUpsController', () => {
  let controller: SignUpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignUpsController],
      providers: [SignUpsService],
    }).compile();

    controller = module.get<SignUpsController>(SignUpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
