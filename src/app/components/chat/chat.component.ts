import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  mensaje: string = '';
  elemento:any;

  constructor(public chatS: ChatService) {
    //hago que se recorra hasta abajo
    this.chatS.cargarMensajes().subscribe(()=>{
      setTimeout(()=>{
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },10)
    });
  }
  //asigno el id del html al ts
  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes')
  }
//mando lo typeado a firebase
  enviar_mensaje() {
    if (this.mensaje.length === 0) {
      return;
    }//si tiene una longitud mayor a 0
    this.chatS.agregarMnesaje(this.mensaje).then(
      //si no falla
      () => {
        console.log('success');
        this.mensaje = '';
      }//si falla
    ).catch(
      (err) => {
        console.log('error', err);
      })
  }

}
