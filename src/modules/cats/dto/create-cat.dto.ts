import { IsNotEmpty, IsInt, IsPositive, IsString } from "class-validator";

export class CreateCatDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  age: number;

  @IsNotEmpty()
  @IsString()
  breed: string;
}
