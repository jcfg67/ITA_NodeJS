import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { Room } from './Room';

@Entity({name: "messages"})
export class Message {
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    content?: string;

    @Column( { nullable: true } )
    roomId!: number | null;

    @ManyToOne(() => Room, room => room.messages, { cascade: true })
    @JoinColumn({ name: "roomId" })
    room!: Room | null;
}
