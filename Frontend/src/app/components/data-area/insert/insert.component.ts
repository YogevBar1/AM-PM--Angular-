import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductModel } from 'src/app/models/product.model';
import { CategoryModel } from 'src/app/models/category.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-insert',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './insert.component.html',
    styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
    public categories: CategoryModel[];
    public product = new ProductModel();

    public constructor(private dataService: DataService,
        private router: Router) { }

    public async ngOnInit() {
        try {
            this.categories = await this.dataService.getAllCategories();
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async send() {
        try {
            console.log(this.product);
            await this.dataService.addProduct(this.product);
            alert("product has been added");
            this.router.navigateByUrl("/list");


        }
        catch (err: any) {
            alert(err.message);
        }
    }


}
