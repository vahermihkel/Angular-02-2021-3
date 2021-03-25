import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  categories!: {categoryName: string}[];

  constructor(private itemService: ItemService,
    private router: Router,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
   this.categoryService.getCategoriesFromDatabase().subscribe(categoriesFromFb => {
      this.categories = categoriesFromFb;
      console.log("VÕTAN SERVICE_ST")
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let formValue = form.value;
      let item = new Item(
        formValue.title,
        formValue.price, 
        formValue.category, 
        formValue.imgSrc);
      this.itemService.addItemToDatabase(item);
      this.router.navigateByUrl("/admin/view-items")
    }
  }

}
