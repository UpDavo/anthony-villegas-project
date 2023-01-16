import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class user {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;
}
