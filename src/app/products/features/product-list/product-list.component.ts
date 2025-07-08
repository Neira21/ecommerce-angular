import { CartStateService } from './../../../cart/data/cart-state.service';
import { Component, inject, output } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { ProductStateService } from '../../data/product-state.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styles: ``,
  providers: [ProductStateService]
})
export default class ProductListComponent {

  mensaje= "";

  productsState = inject(ProductStateService);
  cartState = inject(CartStateService).state;


  addToCard = output<Product>();

  add(product:Product) {

    Swal.fire({
      title: "Desea agregar este producto al carrito?",
      text: "producto: " + product.title,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, agregar!",
      cancelButtonText: "Cancelar"

    }).then((result) => {
      if (result.isConfirmed) {
        this.cartState.add({
          product,
          quantity: 1}
        );
        Swal.fire({
          title: "Agregado!",
          text: "Revise su producto en el carrito",
          icon: "success"
        });
      }else{
        Swal.fire({
          title: "Cancelado",
          text: "No se agregó el producto al carrito",
          icon: "error"
        });
      }
    })













  }





}
