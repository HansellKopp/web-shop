import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  id: string = '';
  title: string = '';
  files: File[] = [];
  categories: string[];
  allCategories: string[];
  removable = true;
  editingImages: boolean = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  form: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    images: ['', [Validators.required]],
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
            },
            error=> console.log(error)
          )

    } else {
      this.title = 'New Product'
    }
  }
  logChanges() {
   // this.form.valueChanges.subscribe(data=> console.log(this.form))
  }

  hasErrors(p: string) {
    const field=this.form.get(p)
    return field?.invalid && field?.touched
  }

  save() {
    Object.values(this.form.controls)
    .forEach((control: AbstractControl) => control?.markAllAsTouched());
    if(this.form.invalid) {
      return
    }
    let request: Observable<any> = !this.id ?
      this.products.postProduct(this.form.value) :
      this.products.putProduct(this.id, this.form.value)

    request.subscribe(()=> 
      this.openSnackBar('Product successfully saved','OK', 
      () => this.router.navigate(['admin','products']))
    )

  }

  cancel() {
    this.router.navigate(['admin','products'])
  }

  // Categories
  remove(category: string): void {
    const categories = [...this.form.controls['categories'].value]
    const index = categories.indexOf(category);

    if (index >= 0) {
      categories.splice(index, 1);
      this.form.controls['categories'].setValue([...categories]);
    }
  }

  get filteredCategories(): string[] {
    const categories = [...this.form.controls['categories'].value]
    if(!categories) return this.allCategories
    return this.allCategories
                 .filter(x => !categories.includes(x))
                 .concat(categories.filter(x => !this.allCategories.includes(x)));
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
      this.form.controls['categories'].setValue([...this.categories]);
    }
    if (input) {
      input.value = '';
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const input = event.option;
    const value = input.value;
    const categories = [...this.form.controls['categories'].value]
    if ((value || '').trim()) {
      if(-1 === categories.indexOf(value)) { //event.option.viewValue
        categories.push(value)
        this.form.controls['categories'].setValue([...categories]);        
        this.categoryInput.nativeElement.value=''
      }
    }
  }

  // images
  editImages() {
    if(this.editImages) {
      const formData = new FormData();
      for (const file of this.files) {
        formData.append('files', file);      
      }
      let imageRequest: Observable<any> = this.products.postImages( formData )    
      imageRequest.subscribe((response) => {        
        const images = response.map(item=> {
          return item['secure_url']
        })
        this.form.controls['images'].setValue(images);        
      })
    }
    this.editingImages = !this.editingImages
  }

  onSelectImage(event) {
    this.files.push(...event.addedFiles);
  }
  
  onRemoveImage(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}


