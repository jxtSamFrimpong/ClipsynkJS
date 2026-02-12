import { Test, TestingModule } from '@nestjs/testing';
import { ClipboardController } from './clipboard.controller';
import { ClipboardService } from './clipboard.service';

describe('ClipboardController', () => {
  let controller: ClipboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClipboardController],
      providers: [ClipboardService],
    }).compile();

    controller = module.get<ClipboardController>(ClipboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
