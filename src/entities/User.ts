import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  PrimaryColumn
} from 'typeorm';

import { Exclude } from "class-transformer";

// TODO find better way to either disable this rule or fix it
/* eslint-disable import/no-cycle */
import Snippet from './Snippet';
import Comment from './Comment';

@Entity({ name: 'user' })
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  email!: string;

  @Column()
  description: string;

  @Column({select: false})
  password: string;

  @OneToMany(() => Snippet, (snippet: Snippet) => snippet.user, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  snippets: Array<Snippet>

  // @OneToMany(() => Comment, (comment: Comment) => comment.creator)
  // comments: Comment[];
}