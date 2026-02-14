import { Exclude } from "class-transformer";
import { Device } from "src/devices/entities/device.entity";
import { User } from "src/users/entities/user/user";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('clipgroup')
export class Clipgroup {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => User, user => user.clipgroups)
    @JoinTable()
    groupMembers: User[];

    @ManyToOne(() => User, { cascade: true })
    owner: User;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false } )
    isPublic: boolean;

    @Column({ default: true })
    isDefaultGroup: boolean;

    @ManyToMany(() => Device)
    @JoinTable()
    devices: Device[];

    @Exclude()
    @Column({ type: 'timestamp', nullable: true })
    @CreateDateColumn()
    createdAt: Date;

    @Exclude()
    @Column({ type: 'timestamp', nullable: true })
    @UpdateDateColumn()
    updatedAt: Date;
}
