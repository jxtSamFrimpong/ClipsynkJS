import * as bcrypt from 'bcryptjs';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate, ManyToMany } from 'typeorm';
import { ClipboardEvent } from 'src/clipboard/entities/clipboard.entity';
import { IsEmail, IsOptional } from "class-validator";
import { Exclude } from 'class-transformer';
import { UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Device } from 'src/devices/entities/device.entity';
import { Clipgroup } from 'src/clipgroup/entities/clipgroup.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 80 })
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Exclude() // Excludes password when turning object to JSON
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastSeen: Date;


  @IsOptional()
  @OneToMany(() => ClipboardEvent, (event) => event.sourceUserId, { cascade: true })
  @Column({ type: 'jsonb', default: [] })
  clipboardEvents: ClipboardEvent[];

  @IsOptional()
  @OneToMany(() => Device, (device) => device.user, { cascade: true })
  @Column({ type: 'jsonb', default: [] })
  devices: Device[];


  @ManyToMany(() => Clipgroup, clipgroup => clipgroup.groupMembers, { cascade: true })
  @Column({ type: 'jsonb', default: [] })
  clipgroups: Clipgroup[];


  @BeforeInsert()
  async hashPassword() {
    if (this.passwordHash && !this.passwordHash.startsWith('$2')) {
      this.passwordHash = await bcrypt.hash(this.passwordHash, 10); //TODO: salt rounds should be configurable and not hardcoded
    }
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    console.log('User entity before update:', this);
    console.log('Before update hook triggered for user:', this.id, this.name);
    if (this.passwordHash && !this.passwordHash.startsWith('$2')) {
      this.passwordHash = await bcrypt.hash(this.passwordHash, 10); //TODO: salt rounds should be configurable and not hardcoded
    }

    console.log('about to update users last seen to now', this.id, this.name)
    this.lastSeen = new Date()
    console.log('updated users last seen to now', this.id, this.name, this.lastSeen)

    console.log('User entity after update:', this);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}