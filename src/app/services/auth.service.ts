import { Injectable } from '@angular/core';
//Angular Fire Auth
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user'
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor(
    private userAuth: AngularFireAuth,
    private userCollection: AngularFirestore,
    private navCtrl: NavController
  ) { }

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
    this.userCollection.collection('users').add(user)
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
}
