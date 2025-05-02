import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly userService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createAddressDto: CreateAddressDto) {
    const { userID, ...AddressDate } = createAddressDto
    // const user = await this.userRepository.findOneByOrFail({ id: userID })
    const user = await this.userService.findOne(userID)
    const address = this.addressRepository.create({ ...AddressDate, user });

    return this.addressRepository.save(address);
  }

  async findAll(): Promise<Address[]> {
    return await this.addressRepository.find({ relations: ["user"] });
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({ where: { id }, relations: ["user"] });
    if (!address) {
      throw new NotFoundException("Address not found");
    }
    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const address = await this.addressRepository.findOneBy({ id });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    Object.assign(address, updateAddressDto);

    return await this.addressRepository.save(address);
  }

  async remove(id: number): Promise<void> {
    const address = await this.addressRepository.findOne({ where: { id } });
    if (!address) {
      throw new NotFoundException("Address not found");
    }
    await this.addressRepository.remove(address);
  }
}
