import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public products = new Array<Product>()
  private productSubscription: Subscription
  public users = new Array<User>()  
  private userSubscription: Subscription  
  public currentUser: any

  constructor(
    private authService: UserAuthService,
    private productService: ProductService,
    private userAuth: AngularFireAuth
  ) {
    this.productSubscription = this.productService.getProducts()
      .subscribe(
        data => {
          this.products = data
        }
      )
    this.userSubscription = this.authService.getAllUsers().subscribe(data => { this.users = data })
    this.userAuth.user.subscribe((data) => { this.currentUser = data })
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
  async deleteProduct(id: string) {
    try {
      await this.productService.deleteProduct(id)
    } catch (error) {
      console.log("Erro: " + error)
    }
  }

}
