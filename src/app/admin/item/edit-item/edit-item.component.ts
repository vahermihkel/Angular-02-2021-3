import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  id!: number;
  item!: Item;
  editItemForm!: FormGroup;
  categories!: {categoryName: string}[];

  constructor(private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router,
    private categoryService: CategoryService,
    private location: Location) { }

  ngOnInit(): void {
    this.categoryService.getCategoriesFromDatabase().subscribe(categoriesFromFb => {
      this.categories = categoriesFromFb;
    });

    this.itemService.getItemsFromDatabase().subscribe(itemsFromDatabase => {
      this.itemService.items = [];
      for (const key in itemsFromDatabase) {
          const element = itemsFromDatabase[key];
          this.itemService.items.push(element);
      }
      this.item = this.itemService.items[this.id];
      this.editItemForm = new FormGroup({
      title: new FormControl(this.item.title), // enne koolonit peab olema sama mis HTML-s
      price: new FormControl(this.item.price), // formControlName=""
      imgSrc: new FormControl(this.item.imgSrc), // this.item.->..<-  peab olema sama mis Modelis
      category: new FormControl(this.item.category),
      isActive: new FormControl(this.item.isActive),
    })
    })

    this.id = (Number)(this.route.snapshot.paramMap.get('itemId'));
    // console.log(this.route);
    // console.log(this.route.snapshot);
    // console.log(this.route.snapshot.paramMap);
  }

  onBack() {
    this.location.back();
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      let formValue = form.value;
      let item = new Item(
        formValue.title,
        formValue.price, 
        formValue.category, 
        formValue.imgSrc,
        formValue.isActive); // peab olema sama mis HTML-s, formControlName=""
      this.itemService.items[this.id] = item;
      this.itemService.saveItemsToDatabase().subscribe(()=>{this.router.navigateByUrl("/admin/view-items")});
      // setTimeout(()=>{this.router.navigateByUrl("/admin/view-items")},200)
    } 
  }

}
