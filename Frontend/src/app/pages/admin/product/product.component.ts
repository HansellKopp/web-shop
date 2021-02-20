import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  id: string = ''
  title: string = ''
  categories: string[];
  allCategories: string[]
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  form: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    image: ['', [Validators.required, Validators.minLength(6)]],
    subtitle: ['', [Validators.required, Validators.minLength(2)]],
    excerpt: ['', [Validators.required, Validators.minLength(6)]],
    content: ['', [Validators.required, Validators.minLength(6)]],
    price: ['', [Validators.required, Validators.pattern("^[0-9.,]*$")]],
    categories: ['', [Validators.required]]
  })
  
  constructor(private formBuilder: FormBuilder,
              private products: ProductsService,
              private active: ActivatedRoute,
              private snackBar: MatSnackBar,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.logChanges()
    this.loadCategories()
    this.loadProduct()
  }

  openSnackBar(message: string, action: string, callback?: Function) {
    let ref = this.snackBar.open(message, action, {
      duration: 2000,
    });
    if(callback) {
      ref.afterDismissed().subscribe(() => callback())
    }
  }

  loadProduct() {
    const params = this.active.snapshot.params
    if(params.id!=='new')  {
      this.products.getProductById(params.id)
          .subscribe(
            data=> {
              this.id = data._id
              this.title = data.title
              this.form.reset(data)
              this.categories=Array.isArray(data.categories) ? data.categories: (<string>data.categories).split(',')
            },
            error=> console.log(error)
          )

    } else {
      this.title = 'New Product'
    }
  }
  logChanges() {
    this.form.valueChanges.subscribe(data=> console.log(this.form))
  }

  hasErrors(p: string) {
    const field=this.form.get(p)
    return field?.invalid && field?.touched
  }

  save() {
    this.form.controls['categories'].setValue(this.categories);
    Object.values(this.form.controls)
    .forEach((control: AbstractControl) => control?.markAllAsTouched());
    if(this.form.invalid) {
      return
    }
    if(!this.id) {
      this.products.postProduct(this.form.value)
                   .subscribe(result=> 
                      this.openSnackBar('Product successfully created','OK', 
                      () => {
                        this.router.navigate(['admin','products'])
                      })
                    )
    } else {
      this.products.putProduct(this.id, this.form.value)
                    .subscribe(result=> 
                      this.openSnackBar('Product successfully saved','OK', 
                      () => {
                        this.router.navigate(['admin','products'])
                      })
                    )
    }
  }

  cancel() {
    this.router.navigate(['admin','products'])
  }

  remove(category: string): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  get filteredCategories(): string[] {
    if(!this.categories) return this.allCategories
    return this.allCategories
                 .filter(x => !this.categories.includes(x))
                 .concat(this.categories.filter(x => !this.allCategories.includes(x)));
  }

  loadCategories() {
    this.allCategories = [
      'Monitores','Partes y Piezas',
      'Hard drives','Computer Parts',
      'PlayStation','Konsoles',
      'Scooters','Sport',
      'Apple','Laptop'
    ]
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim() 
        && -1 !== this.allCategories.indexOf(value)
        && -1 === this.categories.indexOf(value)
      ) {
      this.categories.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.form.controls['categories'].setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(-1 === this.categories.indexOf(event.option.viewValue)) {
      this.categories.push(event.option.viewValue);
    }
    this.categoryInput.nativeElement.value = '';
    this.form.controls['categories'].setValue(null);
  }
}


