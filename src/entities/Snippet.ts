import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm'
import {Users} from './User'
import {Comment} from './Comment'

@Entity()
export class Snippet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({unique: true})
  uniqueid!: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  description: string;

  @Column()
  private: boolean;

  @Column() 
  tags: string;

  @Column()
  downvotes: number;

  @Column() 
  upvotes: number;

  @Column()
  lang: string;

  @Column()
  code!: string;

  @ManyToOne(() => Users, user => user.snippets)
  creator: Users;

  @OneToMany(() => Comment, comment => comment.snippet)
  comments: Comment[]

  @Column()
  creatorId: string;
}