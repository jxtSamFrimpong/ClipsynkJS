// device-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '../../devices/entities/device.entity';
import { Request } from 'express';

@Injectable()
export class DeviceAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,
  ) {}

  private extractApiKey(request: Request): string | null {
    // Support both Bearer token header and X-API-Key header
    const authHeader = request.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.slice(7);
    }
    return (request.headers['x-api-key'] as string) ?? null;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
        const request = context.switchToHttp().getRequest<Request>();
        const apiKey = this.extractApiKey(request);

        if (!apiKey) throw new UnauthorizedException('Missing API key');

        const device = await this.deviceRepo.findOne({
        where: { apiKey, isActive: true },
        relations: ['user'],
        });

        if (!device) throw new UnauthorizedException('Invalid or inactive device');

        // Attach device to request for use in controllers/services
        request['device'] = device;

        // Fire-and-forget lastSeen update
        this.deviceRepo.update(device.id, { lastSeen: new Date() });

        return true;
    }
    catch (error) {
        console.error('Error in DeviceAuthGuard:', error);
        return false;
    }
  }
}