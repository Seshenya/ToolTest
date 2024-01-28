import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity('search_history')
export class SearchHistory extends BaseEntity {
    constructor(obj = {}) {
        super()
        Object.assign(this, obj)
    }

    @PrimaryGeneratedColumn()
    user_id: number

    @Column()
    search_last_updated: Date

    @Column({ type: 'datetime', nullable: true })
    cron_last_run_time: Date

    @Column({ type: 'text' })
    search_history: string

}
