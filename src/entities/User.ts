import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'

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
}