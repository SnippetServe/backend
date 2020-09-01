import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryColumn
} from 'typeorm';
// TODO find better way to either disable this rule or fix it
/* eslint-disable import/no-cycle */
import User from './User';
import Comment from './Comment';

@Entity()
export default class Snippet extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string

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

  @ManyToOne(() => User, (user: User) => user.snippets, {primary: true})
  @JoinColumn({name: "userUUID"})
  user: User

  @Column()
  userUUID: string

  // @OneToMany(() => Comment, (comment: Comment) => comment.snippet)
  // comments: Comment[];
}
