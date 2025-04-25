import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("event")
export class Event{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:true, default: '' })
    creatorId:string;
    @Column({nullable:true, default: '' })
    title:string;
    @Column({nullable:true,default: ''})
    category:string;
    @Column({nullable:true,default: ''})
    description:string;
    @Column({nullable:true,default: ''})
    prix:string;
    @Column({nullable:true})
    capacity:string;
    @Column({nullable:true,default: ''})
    imageUrl:string;
    @Column({nullable:true,default: ''})
    location:string;
    @Column({nullable:true,default: () => 'CURRENT_TIMESTAMP'})
    dateD:Date;
    @Column({nullable:true,default: () => 'CURRENT_TIMESTAMP'})
    dateF:Date;
    @Column({nullable:true,default: ''})
    employees:string;
    @Column({nullable:true,default: ''})
    participants:string;
    @Column({nullable:true,default: ''})
    resources:string;
    @Column({nullable:true,default: ''})
    status:string;




}
