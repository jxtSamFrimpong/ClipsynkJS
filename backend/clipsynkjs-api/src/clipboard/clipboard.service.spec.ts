import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClipboardService } from './clipboard.service';
import { ClipboardEvent } from './entities/clipboard.entity';

describe('ClipboardService', () => {
  let service: ClipboardService;

  const mockRepo = {
    findAndCount: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClipboardService,
        { provide: getRepositoryToken(ClipboardEvent), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<ClipboardService>(ClipboardService);
    jest.clearAllMocks();
  });

  it('should be defined', () => expect(service).toBeDefined());

  describe('findAll()', () => {
    it('page 1 → skip is 0', async () => {
      mockRepo.findAndCount.mockResolvedValue([[], 0]);

      await service.findAll({ page: 1, limit: 7 });

      expect(mockRepo.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 0, take: 7 }),
      );
    });

    it('page 2 → skip equals limit, not 1', async () => {
      mockRepo.findAndCount.mockResolvedValue([[], 0]);

      await service.findAll({ page: 2, limit: 7 });

      expect(mockRepo.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 7, take: 7 }),
      );
    });

    it('page 3 with limit 10 → skip is 20', async () => {
      mockRepo.findAndCount.mockResolvedValue([[], 0]);

      await service.findAll({ page: 3, limit: 10 });

      expect(mockRepo.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 20, take: 10 }),
      );
    });

    it('orders by createdAt DESC (newest first)', async () => {
      mockRepo.findAndCount.mockResolvedValue([[], 0]);

      await service.findAll({ page: 1, limit: 7 });

      expect(mockRepo.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({ order: { createdAt: 'DESC' } }),
      );
    });

    it('returns { data, total } — not a raw tuple', async () => {
      const fakeEvents = [{ id: 'uuid-1' }, { id: 'uuid-2' }] as ClipboardEvent[];
      mockRepo.findAndCount.mockResolvedValue([fakeEvents, 42]);

      const result = await service.findAll({ page: 1, limit: 7 });

      expect(result).toEqual({ data: fakeEvents, total: 42 });
    });

    it('total reflects the full count, not just the page size', async () => {
      mockRepo.findAndCount.mockResolvedValue([[], 99]);

      const result = await service.findAll({ page: 1, limit: 7 });

      expect(result.total).toBe(99);
    });

    it('data array is the events returned by the repository', async () => {
      const fakeEvents = [{ id: 'uuid-a' }] as ClipboardEvent[];
      mockRepo.findAndCount.mockResolvedValue([fakeEvents, 1]);

      const result = await service.findAll({ page: 1, limit: 7 });

      expect(result.data).toBe(fakeEvents);
    });

    it('propagates repository errors', async () => {
      mockRepo.findAndCount.mockRejectedValue(new Error('DB connection lost'));

      await expect(service.findAll({ page: 1, limit: 7 })).rejects.toThrow('DB connection lost');
    });
  });
});
