import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {
  constructor (@InjectRepository(Breed) private readonly breedRepository: Repository<Breed>) {}

  async create(createBreedDto: CreateBreedDto): Promise<Breed> {
    return await this.breedRepository.save(createBreedDto);
  }

  async findAll(): Promise<Breed[]> {
    return await this.breedRepository.find();
  }

  async findOne(id: number): Promise<Breed> {
    return await this.breedRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<Breed> {
    return await this.breedRepository.findOneBy({ name });
  }

  async update(id: number, updateBreedDto: UpdateBreedDto): Promise<UpdateBreedDto> {
    const breed = await this.findOne(id)
    if (!breed) throw new BadRequestException('This breed does not exist.')
    
    await this.breedRepository.update(id, updateBreedDto);
    return updateBreedDto;
  }

  async remove(id: number): Promise<Breed> {
    const breed = await this.findOne(id)
    if (!breed) throw new BadRequestException('This breed does not exist.')
    await this.breedRepository.softDelete(id)
    return breed
  }
}
