import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany
} from 'typeorm';
// TODO find better way to either disable this rule or fix it
/* eslint-disable import/no-cycle */
import Snippet from './Snippet';
import Comment from './Comment';

@Entity({ name: 'user' })
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @PrimaryGeneratedColumn('uuid')
  uniqueid!: string;

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

  @Column()
  password: string;

  @OneToMany(() => Snippet, (snippet: Snippet) => snippet.creator)
  snippets: Snippet[];

  @OneToMany(() => Comment, (comment: Comment) => comment.creator)
  comments: Comment[];
}

export default User;
