import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  passwordHash: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    default: false,
  })
  emailConfirmed: boolean;
}
