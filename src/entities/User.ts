import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from 'typeorm'
import {Snippet} from './Snippet'
import { Comment } from './Comment';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @PrimaryGeneratedColumn("uuid")
  uniqueid!: string

  @Column({unique: true})
  username!: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({unique: true})
  email!: string;

  @Column()
  description: string;

  @Column()
  password: string

  @OneToMany(() => Snippet, snippet => snippet.creator)
  snippets: Snippet[]

  @OneToMany(() => Comment, comment => comment.creator)
  comments: Comment[]
}