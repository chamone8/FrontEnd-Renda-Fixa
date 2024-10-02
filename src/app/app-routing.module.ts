import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from '../app/components/product-list/product-list.component';
import { PurchaseProductComponent } from './components/purchase-product/purchase-product.component';
const routes: Routes = [
  { path: 'produtos', component: ProductListComponent },
  { path: '', redirectTo: '/produtos', pathMatch: 'full' },
  { path: 'purchase/:id', component: PurchaseProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
