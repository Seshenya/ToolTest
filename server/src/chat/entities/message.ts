import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity } from 'typeorm';

@Entity()
export class Message extends BaseEntity {

    constructor(obj = {}) {
        super()
        Object.assign(this, obj)
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sender_id: string;

    @Column()
    receiver_id: string;

    @Column()
    content: string;

    @CreateDateColumn()
    timestamp: Date;
}
