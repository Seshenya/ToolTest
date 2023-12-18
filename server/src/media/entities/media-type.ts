import {
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    BaseEntity,
} from 'typeorm'

@Entity('media_type')
export class MediaType extends BaseEntity {
    constructor(obj = {}) {
        super()
        Object.assign(this, obj)
    }

    @PrimaryGeneratedColumn()
    id: number

    @PrimaryColumn({ type: 'varchar', length: 25, unique: true })
    type: string
}
