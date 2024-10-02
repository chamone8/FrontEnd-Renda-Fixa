import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  accountName: string = '';
  purchases: any[] = [];
  accountBalance: number = 0;
  account: Account | null = null;
  message: string = '';
  accountId: string = ';'

  constructor(private productService: ProductService,  private modalService: NgbModal, private accountService: AccountService) { }

  createAccount(name: string, balance: number): void {
    this.accountService.CreateAccount(name, balance).subscribe(response => {
      console.log('Account created successfully', response);
      
    });
    setTimeout(() => {
      this.getLastAccount();
    }, 2000);
  }

  openCreateAccountModal(content: TemplateRef<any>): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getLastAccount(): void {
    this.accountService.getAccount().subscribe({
      next: (accounts: Account[]) => {
        if (accounts.length > 0) {
          this.account = accounts[accounts.length - 1];
          this.accountId = this.account.id;
        } else {
          this.message = 'Nenhuma conta encontrada.';
        }
      },
      error: (err) => {
        this.message = 'Erro ao carregar a conta: ' + err.message;
      }
    });
  }
  
  getPurchaseHistory(accountId: string): void {
    this.productService.getPurchaseByAccount(accountId).subscribe((data: any[]) => {
      this.purchases = data;
    });
  }

  openPurchaseHistoryModal(content: TemplateRef<any>, accountId: string): void {
    this.getPurchaseHistory(accountId);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  
  getProductName(productId: string): string {
    const product = this.products.find(p => p.id === productId); 
    return product ? product.issuerName : 'Produto não encontrado';
  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (data: any[]) => {
        this.getLastAccount();
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}