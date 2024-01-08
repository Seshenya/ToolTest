// Import necessary modules from TypeORM
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from 'typeorm'
import { User } from '../../user/entities'
import { DigitalProduct } from '../../media/entities'

@Entity()
export class Order extends BaseEntity {
    constructor(obj = {}) {
        super()
        Object.assign(this, obj)
    }

    @PrimaryGeneratedColumn()
    order_id: number

    @Column({ type: 'int' })
    buyer_id: number

    @Column({ type: 'int' })
    product_id: number

    @Column({ type: 'timestamp' })
    order_date: Date

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'buyer_id', referencedColumnName: 'user_id' })
    buyer: User

    @ManyToOne(() => DigitalProduct)
    @JoinColumn({ name: 'product_id', referencedColumnName: 'product_id' })
    product: DigitalProduct
}
