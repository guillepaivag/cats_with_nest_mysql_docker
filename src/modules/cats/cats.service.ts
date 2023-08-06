import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { BreedsService } from '../breeds/breeds.service';

@Injectable()
export class CatsService {

  constructor (
    private readonly breedService: BreedsService,
    @InjectRepository(Cat) private catsRepository: Repository<Cat>
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    if (!createCatDto.breed) throw new BadRequestException('The breed is required.')

    const breed = await this.breedService.findOneByName(createCatDto.breed)
    if (!breed) throw new BadRequestException('This breed does not exist.')
    
    const newCat = { ...createCatDto, breed }
    return await this.catsRepository.save(newCat)
  }

  async findAll(): Promise<Cat[]> {
    return await this.catsRepository.find();
  }

  async findOne(id: number): Promise<Cat> {
    return await this.catsRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<UpdateCatDto> {
    const cat = await this.findOne(id)
    if (!cat) throw new BadRequestException('This cat does not exist.')

    // await this.catsRepository.update(id, updateCatDto);

    return updateCatDto
  }

  async remove(id: number): Promise<Cat> {
    const cat = await this.findOne(id)
    if (!cat) throw new BadRequestException('This cat does not exist.')
    await this.catsRepository.softDelete(id);
    return cat
  }
}