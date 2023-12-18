import {
    Entity,
    PrimaryColumn,
    BaseEntity,
} from 'typeorm'

@Entity('category')
export class Category extends BaseEntity {
    constructor(obj = {}) {
        super()
        Object.assign(this, obj)
    }

    @PrimaryColumn({ type: 'varchar', length: 25, unique: true })
    type: string
}
