import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

//Serviço Autenticação e registro de usuário
import { UserAuthService } from '../../services/auth.service'
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, { static: false } ) private slides: IonSlides
  
  public userRegister: User = {}


  constructor(
    private userAuthService: UserAuthService
  ) { }

  ngOnInit() {
  }

  //Método para registrar um novo usuário
  register(){
    this.userAuthService.registerUser(this.userRegister)
    this.userRegister = {}
  }

  //Scrolling da página login e cadastro
  segmentChanged(event: any){
    console.log(event.type)
    if(event.detail.value === "login"){
      this.slides.slidePrev()
    }else{
      this.slides.slideNext()
    }
  }

}
