import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false, name: "product_name" })
    productName: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @CreateDateColumn({ name: "created_at" })
    createdDate: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedDate: Date;

    @ManyToOne(() => User, (user) => user.products)
    user: User

}