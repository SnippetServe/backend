import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
// TODO find better way to either disable this rule or fix it
/* eslint-disable import/no-cycle */
import {User} from './User';
import Comment from './Comment';

@Entity()
export class Snippet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @PrimaryGeneratedColumn("uuid")
  uniqueid!: string

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

  @ManyToOne(() => User, user => user.snippets, {primary: true})
  creator: User

  // @OneToMany(() => Comment, (comment: Comment) => comment.snippet)
  // comments: Comment[];
  // @Column()
  // creatorId!: number;
}
