import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { organization } from './organization.entity';

@Entity()
export class tribe {
  @PrimaryGeneratedColumn('increment')
  id_tribe: number;

  @ManyToOne((type) => organization, { cascade: true })
  @JoinColumn({ name: 'id_organization' })
  id_organization: organization;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  status: string;
}
