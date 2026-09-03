import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../service/storage/storage.service';

export interface PasswordEntry {
  id: number;
  platform: string;
  username: string;
  password: string;
  show: boolean;
  iconColor: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
  private storageService = inject(StorageService);

  passwords: PasswordEntry[] = [
    { id: 1, platform: 'Netflix', username: 'mi_correo@gmail.com', password: 'MiSuperPassword123', show: false, iconColor: 'bg-red-500' },
    { id: 2, platform: 'GitHub', username: 'dev_ninja', password: 'DevPassword!456', show: false, iconColor: 'bg-gray-800' },
    { id: 3, platform: 'Redit', username: 'awacate', password: 'Awacate1234!!', show: false, iconColor: 'bg-orange-500' },
    { id: 4, platform: 'Spotify', username: 'user_music', password: 'MusicLover789', show: false, iconColor: 'bg-green-500' }
  ];

  editingId: number | null = null;
  mostrarFormularioAgregar = false;
  nuevoItem: PasswordEntry = this.crearItemVacio();

  ngOnInit() {
    const guardadas = this.storageService.obtener('misPasswords');
    if (guardadas) this.passwords = guardadas;
  }

  private persistir() {
    this.storageService.guardar('misPasswords', this.passwords);
  }

  private crearItemVacio(): PasswordEntry {
    return {
      id: this.passwords.length ? Math.max(...this.passwords.map(p => p.id)) + 1 : 1,
      platform: '', username: '', password: '', show: false, iconColor: 'bg-indigo-500'
    };
  }

  togglePassword(id: number) {
    const p = this.passwords.find(x => x.id === id);
    if (p) p.show = !p.show;
  }

  copiarPassword(pwd: string) {
    navigator.clipboard.writeText(pwd).then(() => alert('¡Contraseña copiada!'));
  }

  editar(id: number) {
    this.editingId = id;
  }

  guardarEdicion() {
    this.editingId = null;
    this.persistir();
  }

  toggleFormularioAgregar() {
    this.mostrarFormularioAgregar = !this.mostrarFormularioAgregar;
    if (this.mostrarFormularioAgregar) this.nuevoItem = this.crearItemVacio();
  }

  agregarPassword() {
    if (this.nuevoItem.platform && this.nuevoItem.username && this.nuevoItem.password) {
      this.passwords.push({ ...this.nuevoItem });
      this.persistir();
      this.mostrarFormularioAgregar = false;
    } else {
      alert('Completa todos los campos.');
    }
  }

  eliminar(id: number) {
    this.passwords = this.passwords.filter(p => p.id !== id);
    this.persistir();
  }
}