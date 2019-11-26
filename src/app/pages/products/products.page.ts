import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { UserAuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  public product: Product = {}
  private productId: string = null

  constructor(
    private productService: ProductService,
    private userAuth: UserAuthService
  ) { }

  async addProduct() {
    this.product.userId = this.userAuth.getAuth().currentUser.uid
    if (this.productId) {
      try {
        await this.productService.updateProduct(this.product, this.productId)
      } catch (error) {
        console.log('Erro: ' + error)
      }
    } else {
      try {
        await this.productService.addProduct(this.product)
      } catch (error) {
        console.log('Erro: ' + error)
      }
    }
  }

  ngOnInit() {
  }

}
