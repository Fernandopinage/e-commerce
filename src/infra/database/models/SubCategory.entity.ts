import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from './Category.entity';
import { Product } from './Product.entity';

@Entity('sub_category')
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.id, { onDelete: 'CASCADE' })
  category: Category;

  @OneToMany(() => Product, (product) => product.subCategory)
  products: Product[];
}
