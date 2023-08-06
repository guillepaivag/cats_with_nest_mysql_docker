import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';

@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) { }

  @Post()
  async create(@Body() createBreedDto: CreateBreedDto): Promise<any> {
    try {
      return await this.breedsService.create(createBreedDto);
    } catch (error) {

      if (error.sql && error.sqlMessage && error.sqlState) 
        return error.driverError

      return JSON.stringify(error)
      
    }
  }

  @Get()
  async findAll(): Promise<any> {
    try {
      return await this.breedsService.findAll();
    } catch (error) {

      if (error.sql && error.sqlMessage && error.sqlState) 
        return error.driverError

      return JSON.stringify(error)
      
    }
  }

  @Get(':type/:code')
  async findOne(@Param('type') type: string, @Param('code') code: number | string): Promise<any> {
    try {
      if (type === 'id' && typeof code === 'number') return await this.breedsService.findOne(code);
      else if (type === 'name' && typeof code === 'string') return await this.breedsService.findOneByName(code);
      else throw new BadRequestException('There was a problem with the fields [type] or [code]')
    } catch (error) {

      if (error.sql && error.sqlMessage && error.sqlState) 
        return error.driverError

      return JSON.stringify(error)
      
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBreedDto: UpdateBreedDto): Promise<any> {
    try {
      return await this.breedsService.update(id, updateBreedDto);
    } catch (error) {

      if (error.sql && error.sqlMessage && error.sqlState) 
        return error.driverError

      return JSON.stringify(error)
      
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    try {
      return await this.breedsService.remove(id);
    } catch (error) {

      if (error.sql && error.sqlMessage && error.sqlState) 
        return error.driverError

      return JSON.stringify(error)
      
    }
  }
}
