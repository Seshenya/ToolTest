import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    Index,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { User } from '../../user/entities'

@Entity('product')
@Index('idx_title_fulltext', ['title', 'tags'], { fulltext: true })
export class DigitalProduct extends BaseEntity {
    constructor(obj = {}) {
        super()
        Object.assign(this, obj)
    }

    @PrimaryGeneratedColumn()
    product_id: number

    @Column({ type: 'tinyint' })
    media_type: number

    @Column({ type: 'text' })
    media: string

    @Column()
    size: number

    @Column({ type: 'timestamp' })
    date: Date

    @Column()
    owner_id: number

    // foreign key on owner_id with userInfo.user_id
    @ManyToOne(() => User)
    @JoinColumn({ name: 'owner_id', referencedColumnName: 'user_id' })
    owner: User

    @Column({ type: 'decimal', precision: 12, scale: 4, default: 0 })
    price: number

    @Column({ type: 'tinyint' })
    status: number

    @Column()
    title: string

    @Column({ type: 'text' })
    description: string

    @Column({ type: 'text', nullable: true })
    tags: string

    @Column()
    file_format: string

    @Column({ type: 'text', nullable: true })
    previews: string

    @Column({ type: 'text', nullable: true })
    thumbnail: string

    @Column()
    category: string
}
