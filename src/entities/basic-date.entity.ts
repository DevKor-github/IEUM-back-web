import { CreateDateColumn, DeleteDateColumn } from 'typeorm';

export class BasicDate {
  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
