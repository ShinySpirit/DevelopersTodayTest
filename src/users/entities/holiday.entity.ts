import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('holidaysEntities')
export class HolidaysEntity {
    @PrimaryGeneratedColumn()
    id: number //ID

    @Column()
    user: number //User's ID

    @Column()
    countryCode: string

    @Column()
    year: number

    @Column({type: 'text', array: true, nullable: true})
    holidays: string[]
}
