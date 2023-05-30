import { Test, TestingModule } from '@nestjs/testing';
import { SignUpsService } from './sign-ups.service';

describe('SignUpsService', () => {
  let service: SignUpsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignUpsService],
    }).compile();

    service = module.get<SignUpsService>(SignUpsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
