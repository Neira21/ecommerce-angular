import { Product } from './../../../shared/interfaces/product.interface';
import { Component, effect, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailStateService } from '../../data/product-detail-state.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styles: ``,
  providers: [ProductDetailStateService]
})
export default class ProductDetailComponent {

  //obtener product desde los parametros de la ruta con ActivatedRoute

  private readonly _activeRouter = inject(ActivatedRoute);
  productdetailstate = inject(ProductDetailStateService).state;

  roundRating(rating: number | undefined | null): number {
  return Math.floor(rating ?? 0);
}

  constructor() {
      const id = this._activeRouter.snapshot.paramMap.get('id');
      if (id) this.productdetailstate.getById(id);
  }

}
