import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { tribe } from './tribe.entity';

@Entity()
export class repository {
  @PrimaryGeneratedColumn('increment')
  id_repository: number;

  @ManyToOne((type) => tribe, { cascade: true })
  @JoinColumn({ name: 'id_tribe' })
  id_tribe: tribe;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: false })
  state: string;

  @CreateDateColumn({ nullable: false })
  create_time: Date;
}
