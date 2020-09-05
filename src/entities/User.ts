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

@Entity({ name: 'user' })
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column({ select: false })
  isOauth: boolean;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  description: string;

  // nullable because if user signs up using oauth, then this column can be null
  @Column({ select: false, nullable: true })
  password: string;

  @OneToMany(() => Snippet, (snippet: Snippet) => snippet.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  snippets: Array<Snippet>;

  // @OneToMany(() => Comment, (comment: Comment) => comment.creator)
  // comments: Comment[];
}
