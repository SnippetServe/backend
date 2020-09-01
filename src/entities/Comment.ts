import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne
} from 'typeorm';
// TODO find better way to either disable this rule or fix it
/* eslint-disable import/no-cycle */
import {User} from './User';
import {Snippet} from './Snippet';

@Entity()
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  uniqueid!: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  text: string;

  @Column()
  private: boolean;

  @Column()
  downvotes: number;

  @Column()
  upvotes: number;

  // @ManyToOne(() => User, (user) => user.comments)
  // creator: User;

  // @ManyToOne(() => Snippet, (snippet) => snippet.comments)
  // snippet: Snippet;

  @Column()
  creatorId: string;
}

export default Comment;
