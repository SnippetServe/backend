import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from 'typeorm'
import {User} from './User'

@Entity()
export class Snippet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({unique: true})
  uniqueid!: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column()
  description: string;

  @Column()
  private: boolean

  @ManyToOne(() => User, user => user.snippets)
  creator: User

  @Column()
  creatorId: string;
}