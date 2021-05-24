import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { Room } from './Room';

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    googleId?: string;
    
    @Column()
    name?: string;

    @Column()
    socketId?: string;

    @Column( { nullable: true } )
    roomId!: number | null;

    @ManyToOne( () => Room, room => room.users, { cascade: true })
    @JoinColumn({ name: "roomId" })
    room!: Room | null;
}
