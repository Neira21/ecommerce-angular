import { Product } from './../../../shared/interfaces/product.interface';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../data/products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styles: ``
})
export default class ProductDetailComponent {

  //obtener product desde los parametros de la ruta con ActivatedRoute

  private readonly _activeRouter = inject(ActivatedRoute);
  private readonly _productService = inject(ProductsService);

  productDetail: Product | undefined;

  private _getProductById(id:number){
    this._productService.getProductById(id).subscribe({
      next: (data) => {
        console.log('Product fetched successfully:', data);
        this.productDetail = data as Product;
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      }
    })
  }


  ngOnInit(): void {
    const id = Number(this._activeRouter.snapshot.paramMap.get('id'));
    this._getProductById(id);
  }

}
