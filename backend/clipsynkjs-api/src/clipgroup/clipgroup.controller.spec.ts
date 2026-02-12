import { Test, TestingModule } from '@nestjs/testing';
import { ClipgroupController } from './clipgroup.controller';
import { ClipgroupService } from './clipgroup.service';

describe('ClipgroupController', () => {
  let controller: ClipgroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClipgroupController],
      providers: [ClipgroupService],
    }).compile();

    controller = module.get<ClipgroupController>(ClipgroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
