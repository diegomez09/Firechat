import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatService{

  private itemsCollection: AngularFirestoreCollection<any>;

  public chats:Mensaje[] = [];

  constructor(private afs: AngularFirestore) { }
  //recibo los mensajes del servicio
  cargarMensajes(){
    //creo mi coleccion
    this.itemsCollection =
    this.afs.collection<Mensaje>('chats');
    //mando la coleccion a mi arreglo local
    return this.itemsCollection.valueChanges().pipe(map((mensajes:Mensaje[])=>{
      console.log(mensajes);
      this.chats = mensajes;
    }))
  }
  //falta uid
  agregarMnesaje(msj:string){
    let mensaje:Mensaje ={
      nombre: 'demo',
      mensaje: msj,
      fecha: new Date().getTime(),
    }

    return this.itemsCollection.add(mensaje);
  }
}
