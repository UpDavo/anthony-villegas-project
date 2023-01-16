import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { repository } from './repository.entity';

@Entity()
export class metric {
  @PrimaryColumn({ nullable: false })
  @ManyToOne((type) => repository, { cascade: true })
  @JoinColumn({ name: 'id_repository' })
  id_repository: repository;

  @Column({ nullable: false })
  coverage: number;

  @Column({ nullable: false })
  bugs: number;

  @Column({ nullable: false })
  vulnerabilities: number;

  @Column({ nullable: false })
  hotspot: number;

  @Column({ nullable: false })
  code_smells: number;
}
