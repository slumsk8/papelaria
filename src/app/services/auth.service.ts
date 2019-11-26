import { Injectable } from '@angular/core';
//Angular Fire Auth
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private userCollection: AngularFirestoreCollection<User>

  constructor(
    private userAuth: AngularFireAuth,
    private userFireStore: AngularFirestore,
    private navCtrl: NavController
  ) { this.userCollection = this.userFireStore.collection<User>('users') }

  //MÉTODOS DE REGISTRO E LOGIN DE USUÁRIO
  async registerUser(user: User) {
    try {
      await this.userAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      user.uuid = this.userAuth.auth.currentUser.uid
      this.sendParameters(user)
    } catch (error) {
      let msgError: string
      switch (error.code) {
        case 'auth/argument-error':
          msgError = 'Preencha os campos email e senha!'
          break
        case 'auth/email-already-in-use':
          msgError = 'Este e-mail já está sendo usado!'
          break
        case 'auth/invalid-email':
          msgError = 'O e-mail informado é inválido!'
          break
      }
      console.log(msgError)
    }
  }
  sendParameters(user: User) {
    // updateProfile é onde eu modificio os paramentros internos do currentuser
    this.userAuth.auth.currentUser.updateProfile({
      displayName: user.username,
      photoURL: '',
    })
    this.userFireStore.collection('users').add(user)
  }
  async loginUser(user: User) {
    try {
      await this.userAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      this.navCtrl.navigateRoot('home')
    } catch (error) {
      let message = error.code
      switch (message) {
        case 'auth/argument-error':
          message = 'Preencha os campos email e senha!'
          break
        case 'auth/invalid-email':
          message = 'O email informado é inválido!'
          break
        case 'auth/wrong-password':
          message = 'A senha não confere!'
          break
        case 'auth/user-not-found':
          message = 'Usuário não localizado!'
          break
      }
      console.log(message)
    }
  }
  logout(){
    this.userAuth.auth.signOut()
  }
  public getAuth(){    
    return this.userAuth.auth
  }
  getAllUsers(){
    return this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(u => {
          const data = u.payload.doc.data()
          const id = u.payload.doc.id

          return { id, ...data }
        })
      })
    )
  }
  getUser(id: string) {
    return this.userCollection.doc<User>(id).valueChanges()
  }

}
