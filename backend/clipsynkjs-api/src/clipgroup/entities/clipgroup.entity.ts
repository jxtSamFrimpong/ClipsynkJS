import { Device } from "src/devices/entities/device.entity";
import { User } from "src/users/entities/user/user";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('clipgroup')
export class Clipgroup {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    //TODO: references user entities and should be a many to many relationship since a user can be in multiple groups and a group can have multiple users
    @Column({ type: 'jsonb', default: [] })
    @ManyToMany(() => User, user => user.id)
    groupMembers: User[];

    @Column({ type: 'uuid', default: null })
    @ManyToOne(() => User, user => user.id, { cascade: true })
    owner: User;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false } )
    isPublic: boolean;

    @Column({ default: true })
    isDefaultGroup: boolean;

    @Column({ type: 'jsonb', default: [] })
    devices: Device[];

    @Column({ type: 'timestamp', nullable: true })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;
}
