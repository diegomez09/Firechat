import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public usuario :any = {};

  constructor(private servicio:ChatService) { }

  ngOnInit(): void {
  }

  ingresar(tipo: string) {
    //console.log(tipo);
    this.servicio.login(tipo);
    this.usuario = this.servicio.user;
    console.log(this.usuario);
  }

  logout(){
    console.log(this.usuario);
    this.servicio.logout();
  }
}
