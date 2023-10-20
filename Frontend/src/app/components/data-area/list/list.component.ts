import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryModel } from 'src/app/models/category.model';
import { DataService } from 'src/app/services/data.service';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
    
    public categories: CategoryModel[];
    public products: ProductModel[];

    public constructor(private dataService: DataService){}

    public async ngOnInit(){
        try{
            this.categories = await this.dataService.getAllCategories();
        }
        catch(err:any){
            alert(err.message);
        }
    }

    public async getProducts(args: Event){
        try{
        const categoryId = (args.target as HTMLSelectElement).value;
        this.products = await this.dataService.getProductsByCategory(categoryId);
        console.log(this.products);
        
        }
        catch(err: any){
            alert(err.message);
        }
        
    }

    public async deleteProduct(productId: string) {
        try {
            await this.dataService.deleteProduct(productId);
            // After deleting, update the product list to reflect the changes
            this.products = this.products.filter(p => p._id !== productId);
        } catch (err: any) {
            alert(err.message);
        }
    }

}
