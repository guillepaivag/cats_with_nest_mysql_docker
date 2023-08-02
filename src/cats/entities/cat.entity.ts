import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, ManyToOne, } from "typeorm";
import { Breed } from "../../breeds/entities/breed.entity";

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    // {eager: true} -> para que traiga las raza al hacer un findOne
    @ManyToOne(() => Breed, (breed) => breed.id, { eager: true })
    breed: Breed;

    @DeleteDateColumn()
    deletedAt: Date;
}