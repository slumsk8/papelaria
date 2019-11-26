import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private authService: UserAuthService
  ) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout()
  }

}
