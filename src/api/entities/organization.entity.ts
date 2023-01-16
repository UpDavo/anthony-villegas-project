import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class organization {
  @PrimaryGeneratedColumn('increment')
  id_organization: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  status: string;
}
