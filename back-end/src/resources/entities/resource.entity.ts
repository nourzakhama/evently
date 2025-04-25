import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("resource")
export class Resource {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({   default: '' })
    name: string;
    @Column({nullable:true,default: 0})
    quantity: number;
    @Column({   default: "available" })
    status: string;
    @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    busyUntil: Date;

}
