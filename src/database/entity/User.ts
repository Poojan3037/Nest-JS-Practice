
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Profile } from "./Profile";
import { Product } from "./Product";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true, nullable: false })
    email: string

    @Column({ nullable: false })
    password: string

    @CreateDateColumn({ name: "created_at" })
    createdDate: Date

    @UpdateDateColumn({ name: "updated_at" })
    updatedDate: Date

    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile

    @OneToMany(() => Product, (product) => product.user)
    products: Product[]
}