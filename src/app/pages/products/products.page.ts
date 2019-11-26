import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { UserAuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  
  public product: Product = {}
  private productId: string = null
  private productSubscription: Subscription

  constructor(
    private productService: ProductService,
    private userAuth: UserAuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.productId = this.activatedRoute.snapshot.params['id']
      if (this.productId) this.loadProduct() 
  }

  loadProduct() {
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data
    })
  }
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
        this.product = {}
      } catch (error) {
        console.log('Erro: ' + error)
      }
    }
  }

  ngOnInit() {
  }

}
