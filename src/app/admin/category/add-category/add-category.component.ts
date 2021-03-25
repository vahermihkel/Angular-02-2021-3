import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  formGroup!: FormGroup;
  error!: any;

  constructor(private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    this.categoryService.addCategoryToDatabase({categoryName: this.formGroup.value.name}).subscribe(
      res => {
        this.router.navigateByUrl("/admin/category")
    }, error => {
        this.error = error;
    });
  }

}
