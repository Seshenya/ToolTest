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
import { Category } from './category'
import { MediaType } from './media-type'

@Entity('product')
@Index('idx_title_fulltext', ['title', 'tags'], { fulltext: true })
export class DigitalProduct extends BaseEntity {
    constructor(obj = {}) {
        super()
        Object.assign(this, obj)
    }

    @PrimaryGeneratedColumn()
    product_id: number

    @ManyToOne(() => MediaType)
    @JoinColumn({ name: 'media_type', referencedColumnName: 'id' })
    @Column({ type: 'tinyint' })
    media_type: number

    @Column({ type: 'simple-array' })
    media: string[]

    @Column({ type: 'text' })
    size: number

    @Column({ type: 'timestamp' })
    date: Date

    // foreign key on owner_id with userInfo.user_id
    @ManyToOne(() => User)
    @JoinColumn({ name: 'owner_id', referencedColumnName: 'user_id' })
    owner: User

    @Column({ type: 'decimal', precision: 12, scale: 4, default: 0 })
    price: number

    @Column({ type: 'tinyint' })
    status: number

    @Column({ type: 'text' })
    title: string

    @Column({ type: 'text' })
    description: string

    @Column({ type: 'text', nullable: true })
    tags: string

    @Column({ type: 'text' })
    file_format: string

    @Column({ type: 'simple-array', nullable: true })
    previews: string[]

    @Column({ type: 'text', nullable: true })
    thumbnail: string

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category', referencedColumnName: 'id' })
    @Column({ type: 'tinyint' })

    category: number

    @Column({ type: 'text' })
    comment: string

    @Column({ type: 'tinyint' })
    isDeleted: number

    // Jonas: We use different ways of writing our variables here.
    // I'd say your way is correct but the isDeleted is wrong.
    // But the problem is also on DB side already. No changes need from you
    // Seshenya: Yes, I agree. The way I have written it is correct.
    @Column({ type: 'text' , nullable: true})
    transcribed_text: string

    @Column({ type: 'tinyint' })
    selling_count: number
}
