import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('order')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true, default: '' })
    stripeId: string;
    @Column({nullable: true, default: ''})
    eventTitle: string;
    @Column({ nullable: true, default: '' })
    eventId: string;
    @Column({ nullable: true, default: '' })
    buyerId: string;
    @Column({ nullable: true, default: '' })
    price: string;
    @Column({ nullable: true, default: 'valider' })
    status: string;
    @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

}
