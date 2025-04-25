import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("participant")
export class Participant {
@PrimaryGeneratedColumn()
id:number;
@Column({nullable:true,default:''})
cin:string;
@Column({nullable:true,default:''})
name:string;
@Column({nullable:true,default:''})
firstName:string;
@Column({nullable:true,default:''})
lastName:string;
@Column({nullable:true,default:''})
email:string;
@Column({nullable:true,default:"satisfait"})
satisfaction:string;
@Column({nullable:true,default:''})
imageUrl:string;
}
