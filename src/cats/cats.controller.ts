import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    try {
      return await this.catsService.create(createCatDto);
    } catch (error) {

      if (error.sql && error.sqlMessage && error.sqlState) 
        return error.driverError

      return JSON.stringify(error)
      
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.catsService.findAll();
    } catch (error) {

      if (error.sql && error.sqlMessage && error.sqlState) 
        return error.driverError

      return JSON.stringify(error)
      
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.catsService.findOne(id);
    } catch (error) {

      if (error.sql && error.sqlMessage && error.sqlState) 
        return error.driverError

      return JSON.stringify(error)
      
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    try {
      return await this.catsService.update(id, updateCatDto);
    } catch (error) {

      if (error.sql && error.sqlMessage && error.sqlState) 
        return error.driverError

      return JSON.stringify(error)
      
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      return await this.catsService.remove(id);
    } catch (error) {

      if (error.sql && error.sqlMessage && error.sqlState) 
        return error.driverError

      return JSON.stringify(error)
      
    }
  }
}
