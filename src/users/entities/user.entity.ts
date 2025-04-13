import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Index({ unique: true })
    @Column()
    email: string;
    @Column()
    password: string;
    @CreateDateColumn()
    createdAt: Date;
    @Column({ default: false })
    isDeleted: boolean;
}