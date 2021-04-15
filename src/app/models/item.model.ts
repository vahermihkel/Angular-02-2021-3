export class Item {
  constructor(
    // public id: string,
    public title: string, 
    public price: number, 
    public category: string, 
    public imgSrc: string,
    public isActive: boolean,
    public description: string,
    public barcode: string,
    public producer: string
  ) {}
}

// "" / string - sõnaline muutuja, ülakomad on väärtusel ümber
// 1.2 / number - numbriline muutuja - siin ei tohi jutumärke olla
// true / boolean - kaks väärtust: tõene või väär
// [] - massiivid
// {} - objektid