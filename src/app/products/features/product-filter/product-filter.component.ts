import { Component, inject, output, OnInit } from '@angular/core';
import { ProductFilters } from '../../../shared/interfaces/product.interface';
import { FormsModule } from '@angular/forms';
import { ProductStateService } from '../../data/product-state.service';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-filter.component.html',
})
export class ProductFilterComponent {

  // Inyectar el servicio de estado de productos
  private productState = inject(ProductStateService);

  // Propiedades para los filtros
  searchTerm = '';
  selectedCategory = '';
  minPrice = 0;
  maxPrice = 10000;
  selectedRating = 0;

  // Método para aplicar los filtros
  onFiltersChange() {
    const filters: ProductFilters = {
      searchTerm: this.searchTerm || undefined,
      category: this.selectedCategory || undefined,
      priceRange: { min: this.minPrice, max: this.maxPrice },
      rating: this.selectedRating || undefined
    };
    // Se llama a applyFilters del servicio de estado de productos
    this.productState.applyFilters(filters);
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedRating = 0;
    this.minPrice = 0;
    this.maxPrice = 10000;

    // Se llama a clearFilters del servicio de estado de productos
    this.productState.clearFilters();
  }
}
