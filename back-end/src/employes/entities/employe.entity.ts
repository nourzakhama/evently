import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('employe')
export class Employe {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({default: ''})
    name:string;
    @Column({default:"tecknicien"})
    role:string;
    @Column({default:"available"})
    status:string;
    @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    busyUntil: Date;

}
