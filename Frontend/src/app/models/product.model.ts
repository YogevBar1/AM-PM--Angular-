import { CategoryModel } from "./category.model";

export class ProductModel {
    public _id: string
    public productName: string
    public categoryId: string
    public manufacturingDate: string
    public expirationDate: string
    public price: number
    public category: CategoryModel
}