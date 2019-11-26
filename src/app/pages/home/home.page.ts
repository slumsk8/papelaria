import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { runInThisContext } from 'vm';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public products = new Array<Product>()
  private productSubscription: Subscription

  constructor(
    private authService: UserAuthService,
    private productService: ProductService
  ) {
    this.productSubscription = this.productService.getProducts()
      .subscribe(
        data => {
          this.products = data
        }
      )
  }

  ngOnInit() {
  }
  //destruindo "sessão" para não ficar buscando dados eternamente
  ngOnDestroy() {
    this.productSubscription.unsubscribe()
  }
  logout() {
    this.authService.logout()
  }
  //método para deletar o produto
  async deleteProdudct(id: string) {
    try {
      await this.productService.deleteProduct(id)
    } catch (error) {
      console.log("Erro: " + error)
    }
  }

}
