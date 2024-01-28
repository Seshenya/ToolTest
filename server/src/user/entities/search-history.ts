import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, ManyToOne } from 'typeorm'
import { User } from './user'

@Entity('search_history')
export class SearchHistory extends BaseEntity {
    constructor(obj = {}) {
        super()
        Object.assign(this, obj)
    }

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
    user_id: number

    @Column()
    search_last_updated: Date

    @Column({ type: 'datetime', nullable: true })
    cron_last_run_time: Date

    @Column({ type: 'text' })
    search_history: string

}
