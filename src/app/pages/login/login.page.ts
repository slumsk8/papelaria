import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, { static: false } ) private slides: IonSlides
  
  constructor() { }

  ngOnInit() {
  }

  //Scrolling da página login e cadastro
  segmentChanged(event: any){
    if(event.detail.value === "login"){
      this.slides.slidePrev()
    }else{
      this.slides.slideNext()
    }
  }

}
