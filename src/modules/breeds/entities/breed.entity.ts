import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cat } from "../../cats/entities/cat.entity";

@Entity()
export class Breed {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Cat, (cat) => cat.breed)
    cats: Cat[];
}