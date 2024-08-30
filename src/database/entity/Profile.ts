import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false, name: "first_name" })
    firstName: string

    @Column({ nullable: false, name: "last_name" })
    lastName: string

    @Column({ nullable: true, name: "phone_number", unique: true })
    phoneNumber: string;

    @CreateDateColumn({ name: "created_at" })
    createdDate: Date

    @UpdateDateColumn({ name: "updated_at" })
    updatedDate: Date

    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn({ name: "user_id" })
    user: User
}