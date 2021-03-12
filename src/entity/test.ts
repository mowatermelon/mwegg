/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { EState } from '../constants';

@EntityModel('Test')
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: EState,
    default: EState.Valid,
  })
  state: EState;
}
