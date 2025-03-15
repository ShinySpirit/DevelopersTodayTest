import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('userEntities')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number //ID

    @Column()
    username: string //Username

    @Column("int", { array: true, nullable: true })
    holidays: number[]; //List of assigned holidays
}
