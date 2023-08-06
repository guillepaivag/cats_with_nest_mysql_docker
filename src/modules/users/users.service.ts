import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto)
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id })
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
    await this.userRepository.update(id, updateUserDto)
    return updateUserDto
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id)
    await this.userRepository.softDelete({ id })
    return user
  }
}
