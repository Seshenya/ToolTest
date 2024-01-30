import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
    constructor(obj = {}) {
        super()
        Object.assign(this, obj)
    }

    @PrimaryGeneratedColumn()
    user_id: number

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    username: string

    @Column()
    password: string

    @Column({ unique: true })
    email: string

    @Column({ type: 'tinyint', default: 1 })
    type: number

    @Column({ type: 'tinyint', default: 1 })
    active_status: number

    @Column({ type: 'text', nullable: true })
    skills: string

    @Column({ nullable: true })
    profile_picture: string

    @Column({ type: 'text', nullable: true })
    description: string

}
