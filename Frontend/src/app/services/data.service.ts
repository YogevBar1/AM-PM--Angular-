import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CategoryModel } from '../models/category.model';
import { environment } from 'src/environments/environment.development';
import { first, firstValueFrom } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public constructor(private http: HttpClient) { }

    public async getAllCategories(): Promise<CategoryModel[]> {
        const observable = this.http.get<CategoryModel[]>(environment.categoriesUrl);
        const categories = await firstValueFrom(observable);
        return categories;
    }

    public async getProductsByCategory(categoryId: string): Promise<ProductModel[]>{
        const observable = this.http.get<ProductModel[]>(environment.productsByCategoriesUrl+ categoryId);
        const products = await firstValueFrom(observable);
        return products;
    }

    public async addProduct(product: ProductModel): Promise<void>{
        const observable = this.http.post<ProductModel>(environment.productsUrl,product);
        const addedProduct = await firstValueFrom(observable);
    }

    public async deleteProduct(_id: string): Promise<void>{
        const observable = this.http.delete<ProductModel>(environment.productsUrl + _id);
        await firstValueFrom(observable);
    }

}
