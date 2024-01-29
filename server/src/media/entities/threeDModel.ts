import {
    Entity,
    PrimaryColumn,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm'

@Entity('three_d_models')
export class ThreeDModel extends BaseEntity {
    constructor(obj = {}) {
        super()
        Object.assign(this, obj)
    }

    @PrimaryGeneratedColumn()
    id: number

    @PrimaryColumn({ type: 'varchar', length: 25, unique: true })
    name: string

    @Column({ type: 'text' })
    url: string
}
