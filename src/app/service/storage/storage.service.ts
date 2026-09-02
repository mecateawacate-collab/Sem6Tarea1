import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  guardar(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  obtener(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  iniciarSesion(usuario: string) {
    this.guardar('sesionActiva', { usuario: usuario, logueado: true });
  }

  cerrarSesion() {
    localStorage.removeItem('sesionActiva');
  }

  estaLogueado(): boolean {
    const sesion = this.obtener('sesionActiva');
    return sesion !== null && sesion.logueado === true;
  }
}