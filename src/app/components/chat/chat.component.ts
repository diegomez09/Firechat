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

  constructor(public chatS: ChatService) {
    this.chatS.cargarMensajes().subscribe();
  }

  ngOnInit(): void {
  }

  enviar_mensaje() {
    if (this.mensaje.length === 0) {
      return;
    }
    this.chatS.agregarMnesaje(this.mensaje).then(
      () => {
        console.log('success');
        this.mensaje = '';
      }
    ).catch(
      (err) => {
        console.log('error', err);
      })
  }

}
