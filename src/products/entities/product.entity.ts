import { Category } from "src/categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BookmarkProduct } from "./product-bookmark.entity";


@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    stock: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable({
        name: "product_categories",
        joinColumn: { name: "product_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "category_id", referencedColumnName: "id" },
    })
    categories: Category[];

    @OneToMany(() => BookmarkProduct, (bookmark) => bookmark.product)
    bookmarks: BookmarkProduct[];
}
