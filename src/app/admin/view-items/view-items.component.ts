import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    // this.items = this.itemService.items;
    this.itemService.getItemsFromDatabase().subscribe(itemsFromDatabase => {
      console.log("võtan andmebaasist");
      for (const key in itemsFromDatabase) {
          const element = itemsFromDatabase[key];
          this.items.push(element);
      }
    })
    console.log("JEI");
  }

  onDeleteItem(i: number) {
    this.items.splice(i,1);
    this.itemService.saveItemsToDatabase(this.items);
  }

}
