import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;

  public chats: Mensaje[] = [];
  public user: any= {};

  constructor(private afs: AngularFirestore,
    public auth: AngularFireAuth) {
      this.auth.authState.subscribe(cambio =>{
        //console.log(cambio)
        if(!cambio){
          return;
        }
        this.user.nombre = cambio.displayName;
        this.user.uid = cambio.uid;
      })
     }
  //recibo los mensajes del servicio
  cargarMensajes() {
    //creo mi coleccion
    this.itemsCollection =
      this.afs.collection<Mensaje>('chats',
        //ordenamos y limitamos
        ref => ref.orderBy('fecha', 'desc').
          limit(10));
    //mando la coleccion a mi arreglo local
    return this.itemsCollection.valueChanges().pipe(map((mensajes: Mensaje[]) => {
      console.log(mensajes);
      this.chats = [];
      for (let mensaje of mensajes) {
        this.chats.unshift(mensaje);
      }
      //this.chats = mensajes;
    }))
  }
  //falta uid
  //mando msj typeado
  agregarMnesaje(msj: string) {
    let mensaje: Mensaje = {
      nombre: this.user.nombre,
      mensaje: msj,
      fecha: new Date().getTime(),
      uid: this.user.uid,
    }

    return this.itemsCollection.add(mensaje);
  }

  login(proveedor: string) {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.user = {};
    //console.log(this.user);
    this.auth.signOut();
  }

}
