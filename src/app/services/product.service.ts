import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //Criando coleção de produtos no firestore
  private productCollection : AngularFirestoreCollection<Product>

  constructor(
    private productFireStore: AngularFirestore,    
  ) { this.productCollection = this.productFireStore.collection<Product>('produtos') }

  addProduct(product: Product) {
    return this.productCollection.add(product)    
   }
  updateProduct(prodcut: Product, id: string) { 
    return this.productCollection.doc<Product>(id).update(prodcut)
  }
  deleteProduct(id: string) { 
   return this.productCollection.doc<Product>(id).delete()
  }
  getProducts() { 
    return this.productCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(p => {
          const data = p.payload.doc.data()
          const id = p.payload.doc.id

          return { id, ...data }
        })
      })
    )
  }
  getProduct(id: string) {
    return this.productCollection.doc<Product>(id).valueChanges()
   }

}
