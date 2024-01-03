import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm'
import { User } from '../../user/entities'
import { DigitalProduct } from '../../media/entities'

@Entity()
export class Review extends BaseEntity {
    constructor(obj = {}) {
        super()
        Object.assign(this, obj)
    }

    @PrimaryGeneratedColumn()
    review_id: number

    @ManyToOne(() => DigitalProduct)
    @JoinColumn({ name: 'product_id', referencedColumnName: 'product_id' })

    @Column({ type: 'bigint' })
    product_id: number

    @Column({ type: 'tinyint', default: 0 })
    rating: number

    @Column({ type: 'text', nullable: true })
    description: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'reviewed_by', referencedColumnName: 'user_id' })
    reviewedByUser: User;
    
    @Column({ type: 'bigint' })
    reviewed_by: number
}
