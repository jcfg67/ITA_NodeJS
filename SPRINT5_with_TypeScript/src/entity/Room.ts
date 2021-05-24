import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';

import { User } from './User';
import { Message } from './Message';

@Entity({name: "rooms"})
export class Room {
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    name?: string;

    @OneToMany(() => User, user => user.room)
    users?: User[];

    @OneToMany(() => Message, message => message.room)
    messages?: Message[];
}
