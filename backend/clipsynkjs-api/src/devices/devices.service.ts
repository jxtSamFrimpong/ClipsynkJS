import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { Repository } from 'typeorm';


@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>
  ) {}
  async create(createDeviceDto: CreateDeviceDto) {
    // return 'This action adds a new device';
    //TODO: user should be signed in
    const { fingerprint, ...rest } = createDeviceDto
    const device =  this.deviceRepository.create({
      deviceFingerprint: fingerprint,
      ...rest
    })
    //device.generateApiKey()
    return await this.deviceRepository.save(device)
  }

  async findAll() {
    //TODO: we should only return devices that belong to the user
    return await this.deviceRepository.find();
  }

  async findOne(id: string) {
    //TODO: we'd return the queried device only if it belongs to the user
    return await this.deviceRepository.findOneBy({ id });
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    //TODO: only devices that belongs to this user can be updated
    const device = await this.deviceRepository.preload({
      id,
      ...updateDeviceDto
    });
    if (!device) {
      throw new Error(`Device with ID ${id} not found`);
    }
    return await this.deviceRepository.save(device);
  }

  async remove(id: string) {
    //TODO: only devices that belongs to this user can be deleted
    const device = await this.deviceRepository.findOneBy({ id });
    if (!device) {
      throw new Error(`Device with ID ${id} not found`);
    }
    return await this.deviceRepository.remove(device);
  }

  async deactivate(id: string) {
    //TODO: only devices that belongs to this user can be deactivated
    //TODO: deactivation can be done on device to be deactivated or user's primary device
    const device = await this.deviceRepository.findOneBy({ id });
    if (!device) {
      throw new Error(`Device with ID ${id} not found`);
    }
    device.isActive = false;
    return await this.deviceRepository.save(device);
  }

  async reactivate(id: string){
    //TODO: device to be reactivated should belong to this user
    //TODO: device can be reactivated with active devices belonging to the User
    const device = await this.deviceRepository.findOneBy({ id });
    if (!device) {
      throw new Error(`Device with ID ${id} not found`);
    }
    device.isActive = true;
    return await this.deviceRepository.save(device);
  }

  async ping(id: string) {
    //TODO: devices beloging to a user can ping themselves, devices in a clipgroup with other users can be pinged by them, anonymouns devices can ping all anonymous devices in the same clipgroup
    const device = await this.deviceRepository.findOneBy({ id });
    if (!device) {
      throw new Error(`Device with ID ${id} not found`);
    }
    return await this.deviceRepository.save(device);
  }

  //respond to a ping request
  async pong(id: string) {
    //TODO: devices beloging to a user can pong themselves, devices in a clipgroup with other users can be ponged by them, anonymouns devices can pong all anonymous devices in the same clipgroup
    const device = await this.deviceRepository.findOneBy({ id });
    if (!device) {
      throw new Error(`Device with ID ${id} not found`);
    }
    return await this.deviceRepository.save(device);
  }

  async promoteToPrimary(id: string) {
    //TODO: only devices that belongs to this user can be promoted to primary, and current primary device of the user should be demoted
    const device = await this.deviceRepository.findOneBy({ id });
    if (!device) {
      throw new Error(`Device with ID ${id} not found`);
    }
    // First, demote any existing primary device for the user
    device.promoteToPrimary()
    return await this.deviceRepository.save(device);
  }
}
