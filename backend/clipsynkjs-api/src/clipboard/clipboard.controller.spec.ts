import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { ClipboardController } from './clipboard.controller';
import { ClipboardService } from './clipboard.service';
import { ClipboardEvent } from './entities/clipboard.entity';

describe('ClipboardController', () => {
  let controller: ClipboardController;

  const mockService = { findAll: jest.fn() };
  const empty = { data: [] as ClipboardEvent[], total: 0 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClipboardController],
      providers: [{ provide: ClipboardService, useValue: mockService }],
    }).compile();

    controller = module.get<ClipboardController>(ClipboardController);
    jest.clearAllMocks();
  });

  it('should be defined', () => expect(controller).toBeDefined());

  describe('findAll()', () => {
    describe('default params', () => {
      it('uses page=1 when no query param is provided', async () => {
        mockService.findAll.mockResolvedValue(empty);

        await controller.findAll();

        expect(mockService.findAll).toHaveBeenCalledWith(
          expect.objectContaining({ page: 1 }),
        );
      });

      it('uses limit=7 when no query param is provided', async () => {
        mockService.findAll.mockResolvedValue(empty);

        await controller.findAll();

        expect(mockService.findAll).toHaveBeenCalledWith(
          expect.objectContaining({ limit: 7 }),
        );
      });
    });

    describe('valid params', () => {
      it('parses and passes string query params as integers', async () => {
        mockService.findAll.mockResolvedValue(empty);

        await controller.findAll('3', '10');

        expect(mockService.findAll).toHaveBeenCalledWith({ page: 3, limit: 10 });
      });

      it('forwards the service result unchanged — no re-mapping', async () => {
        const fake = { data: [{ id: 'uuid-1' } as ClipboardEvent], total: 1 };
        mockService.findAll.mockResolvedValue(fake);

        const result = await controller.findAll('1', '7');

        expect(result).toBe(fake);
      });
    });

    describe('input validation — NaN', () => {
      it('throws BadRequestException when page is non-numeric', async () => {
        await expect(controller.findAll('abc', '7')).rejects.toThrow(BadRequestException);
      });

      it('throws BadRequestException when limit is non-numeric', async () => {
        await expect(controller.findAll('1', 'xyz')).rejects.toThrow(BadRequestException);
      });

      it('throws BadRequestException when both params are non-numeric', async () => {
        await expect(controller.findAll('foo', 'bar')).rejects.toThrow(BadRequestException);
      });

      it('does not call the service when params are invalid', async () => {
        await controller.findAll('bad', '7').catch(() => null);
        expect(mockService.findAll).not.toHaveBeenCalled();
      });
    });

    describe('input clamping — out-of-range values', () => {
      it('clamps page=0 up to 1', async () => {
        mockService.findAll.mockResolvedValue(empty);

        await controller.findAll('0', '7');

        expect(mockService.findAll).toHaveBeenCalledWith(
          expect.objectContaining({ page: 1 }),
        );
      });

      it('clamps negative page up to 1', async () => {
        mockService.findAll.mockResolvedValue(empty);

        await controller.findAll('-5', '7');

        expect(mockService.findAll).toHaveBeenCalledWith(
          expect.objectContaining({ page: 1 }),
        );
      });

      it('clamps limit=0 up to 1', async () => {
        mockService.findAll.mockResolvedValue(empty);

        await controller.findAll('1', '0');

        expect(mockService.findAll).toHaveBeenCalledWith(
          expect.objectContaining({ limit: 1 }),
        );
      });

      it('clamps a very large limit down to 100', async () => {
        mockService.findAll.mockResolvedValue(empty);

        await controller.findAll('1', '9999');

        expect(mockService.findAll).toHaveBeenCalledWith(
          expect.objectContaining({ limit: 100 }),
        );
      });

      it('accepts limit=100 without clamping', async () => {
        mockService.findAll.mockResolvedValue(empty);

        await controller.findAll('1', '100');

        expect(mockService.findAll).toHaveBeenCalledWith(
          expect.objectContaining({ limit: 100 }),
        );
      });
    });
  });
});
