import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-purchase-product',
  templateUrl: './purchase-product.component.html',
  styleUrls: ['./purchase-product.component.css']
})
export class PurchaseProductComponent implements OnInit {

  productId: string = '';  
  quantity: number = 1;
  message: string = '';
  account: Account | null = null;
  product: Product | null = null;  

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';
      this.loadProductDetails();
    });

    this.accountService.getAccount().subscribe({
      next: (accounts: Account[]) => {
        if (accounts.length > 0) {
          this.account = accounts[accounts.length - 1]; // Pegando o último item da lista
        } else {
          this.message = 'Nenhuma conta encontrada.';
        }
      },
      error: (err) => {
        this.message = 'Erro ao carregar a conta: ' + err.message;
      }
    });
  }

  loadProductDetails(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (product: Product) => {
        this.product = product;
      },
      error: (err) => {
        this.message = 'Erro ao carregar os detalhes do produto: ' + err.message;
      }
    });
  }

  purchase() {
    if (!this.account || !this.product) {
      this.message = 'Conta ou produto não encontrados.';
      return;
    }

    const totalPurchaseAmount = this.product.unitPrice * this.quantity;

    if(this.product.stock < this.quantity){
      this.message = 'Quantidade insuficiente para realizar a compra.';
      return;
    }

    if (totalPurchaseAmount > this.account.balance) {
      this.message = 'Saldo insuficiente para realizar a compra.' ;
      return;
    }

    this.productService.purchaseProduct(this.productId, this.account.id, this.quantity).subscribe({
      next: () => {
        this.message = 'Compra realizada com sucesso!';
        setTimeout(() => {
          this.router.navigate(['/produtos']);
        }, 2000);
      },
      error: (err) => {
        this.message = 'Erro ao realizar a compra: ' + err.message;
      }
    });
  }
}
