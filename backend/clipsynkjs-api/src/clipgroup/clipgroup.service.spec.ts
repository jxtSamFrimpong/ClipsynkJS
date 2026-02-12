import { Test, TestingModule } from '@nestjs/testing';
import { ClipgroupService } from './clipgroup.service';

describe('ClipgroupService', () => {
  let service: ClipgroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClipgroupService],
    }).compile();

    service = module.get<ClipgroupService>(ClipgroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
