import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { UserAuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  public product: Product = {}  

  constructor(
    private productService: ProductService,
    private userAuth: UserAuthService,    
    private navCtrl: NavController
  ) { }

  async addProduct() {
    this.product.userId = this.userAuth.getAuth().currentUser.uid
    try {
      await this.productService.addProduct(this.product)      
      this.product = {}
      this.navCtrl.navigateRoot('/home')
    } catch (error) {
      console.log('Erro: ' + error)
    }
  }

  ngOnInit() {
  }

}
