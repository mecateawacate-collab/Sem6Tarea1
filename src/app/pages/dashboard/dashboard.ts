import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

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
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class Dashboard {

  passwords: PasswordEntry[] = [
    { id: 1, platform: 'Netflix', username: 'mi_correo@gmail.com', password: 'MiSuperPassword123', show: false, iconColor: 'bg-red-500' },
    { id: 2, platform: 'GitHub', username: 'dev_ninja', password: 'DevPassword!456', show: false, iconColor: 'bg-gray-800' },
    { id: 3, platform: 'Spotify', username: 'user_music', password: 'MusicLover789', show: false, iconColor: 'bg-green-500' }
  ];

  togglePassword(id: number) {
    const entry = this.passwords.find(p => p.id === id);
    if (entry) {
      entry.show = !entry.show;
    }
  }

  copiarPassword(password: string) {
    navigator.clipboard.writeText(password).then(() => {
      alert('¡Contraseña copiada al portapapeles!');
    });
  }
}