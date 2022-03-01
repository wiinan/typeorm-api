import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user";

@Entity("videos")
export class Video {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user)
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
