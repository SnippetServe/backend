import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from 'typeorm'
import {Snippet} from './Snippet'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({unique: true})
  username!: string;

  @Column({unique: true})
  uniqueid!: string;

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
}