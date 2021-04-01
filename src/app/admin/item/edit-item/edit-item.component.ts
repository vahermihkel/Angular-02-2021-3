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
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategoriesFromDatabase().subscribe(categoriesFromFb => {
      this.categories = categoriesFromFb;
    });

    this.id = (Number)(this.route.snapshot.paramMap.get('itemId'));
    // console.log(this.route);
    // console.log(this.route.snapshot);
    // console.log(this.route.snapshot.paramMap);
    this.item = this.itemService.items[this.id];
    this.editItemForm = new FormGroup({
      title: new FormControl(this.item.title),
      price: new FormControl(this.item.price),
      imgSrc: new FormControl(this.item.imgSrc),
      category: new FormControl(this.item.category),
      isActive: new FormControl(this.item.isActive),
    })
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      let formValue = form.value;
      let item = new Item(
        formValue.title,
        formValue.price, 
        formValue.category, 
        formValue.imgSrc,
        formValue.isActive);
      this.itemService.items[this.id] = item;
      this.itemService.saveItemsToDatabase().subscribe(()=>{this.router.navigateByUrl("/admin/view-items")});
      // setTimeout(()=>{this.router.navigateByUrl("/admin/view-items")},200)
    } 
  }

}
