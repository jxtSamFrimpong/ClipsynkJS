import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    return await this.devicesService.create(createDeviceDto);
  }

  @Get()
  async findAll() {
    return await this.devicesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.devicesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return await this.devicesService.update(id, updateDeviceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.devicesService.remove(id);
  }

  @Put(':id/deactivate')
  async deactivate(@Param('id') id: string) {
    return await this.devicesService.deactivate(id);
  }

  @Put(':id/reactivate')
  async reactivate(@Param('id') id: string) {
    return await this.devicesService.reactivate(id);
  }

  @Put(':id/promote')
  async promoteToPrimary(@Param('id') id: string) {
    return await this.devicesService.promoteToPrimary(id);
  }

  @Post(':id/ping')
  async ping(@Param('id') id: string) {
    return await this.devicesService.ping(id);
  }

  @Post(':id/pong')
  async pong(@Param('id') id: string) {
    return await this.devicesService.pong(id);
  }
}
