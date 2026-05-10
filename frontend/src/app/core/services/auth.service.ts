import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
export interface Usuario {
  id: number;
  username: string;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;

  // Estado del usuario logueado
  usuario = signal<Usuario | null>(this.loadUserFromStorage());

  login(username: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(user => {
          localStorage.setItem('usuario', JSON.stringify(user));
          this.usuario.set(user);
        })
      );
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuario.set(null);
  }

  isAuthenticated(): boolean {
    return this.usuario() !== null;
  }

  private loadUserFromStorage(): Usuario | null {
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  }
}