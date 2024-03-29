import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class User {
    @Column({ primary: true, generated: true })
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ default: "user" })
    role: string;

    @Column({ nullable: false })
    password: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
