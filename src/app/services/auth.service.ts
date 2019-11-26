import { Injectable } from '@angular/core';
//Angular Fire Auth
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user'
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {  
  constructor(
    private userAuth: AngularFireAuth,
    private userCollection: AngularFirestore
  ) { }

  //MÉTODOS DE REGISTRO E LOGIN DE USUÁRIO
  async registerUser (user: User) {
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
}
