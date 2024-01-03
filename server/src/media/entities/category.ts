import {
    Entity,
    PrimaryColumn,
    BaseEntity,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('category')
export class Category extends BaseEntity {
    constructor(obj = {}) {
        super()
        Object.assign(this, obj)
    }

    @PrimaryGeneratedColumn()
    id: number

    @PrimaryColumn({ type: 'varchar', length: 25, unique: true })
    type: string
}
