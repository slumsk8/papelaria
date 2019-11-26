import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { UserAuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.page.html',
  styleUrls: ['./updateproduct.page.scss'],
})
export class UpdateproductPage implements OnInit {

  public product: Product = {}
  private productId: string = null
  private productSubscription: Subscription

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private userService: UserAuthService
  ) {
    this.productId = this.activatedRoute.snapshot.params['id']
    if (this.productId) this.loadProduct()
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }
  loadProduct() {
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data
    })
  }
  async updateProduct() {
    this.product.userId = this.userService.getAuth().currentUser.uid
    if (this.productId) {
      try {
        await this.productService.updateProduct(this.product, this.productId)
        this.navCtrl.navigateRoot('/home')
      } catch (error) {
        console.log('Erro: ' + error)
      }
    }
  }


}
