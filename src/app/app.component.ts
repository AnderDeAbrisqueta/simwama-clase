import { Component } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  displayProductForm: boolean = false;

  products: Observable<Product[]>;

  productForm = new FormGroup({
    productId: new FormControl(''),
    description: new FormControl(''),
    purchasePrice: new FormControl(0),
    salePrice: new FormControl(0),
    stock: new FormControl(0),
    picture: new FormControl('')
  })

  formButtonText = 'Add product';

  constructor(public productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  addProduct() {
    // const newProduct: Product = {
    //   productId: "",
    //   description: 'perfume',
    //   purchasePrice: 12,
    //   salePrice: 25,
    //   stock: 400,
    //   picture:
    //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAKONE_vUrXcBqrFZCEedTBG40cNzONdOEpplMSFlQlBfD9tfitV_Q-PUMkhKGi6GJ3H0&usqp=CAU',
    // };
    this.productService.addProduct(this.productForm.value);
    this.productForm.reset({purchasePrice: 0, salePrice: 0, stock:0});
  }

  showProduct(id: string) {
    this.productService.getProduct(id).subscribe(data => this.productForm.patchValue(data));

    this.formButtonText = "Update product";
    
  }

  updateProductButton() {
    this.productService.updateProduct(this.productForm.value);
  }


  formSubmit() {
    if(this.formButtonText === 'Add product') {
      this.addProduct();
    } else {
      this.updateProductButton();
    }
  }

  

  
}
