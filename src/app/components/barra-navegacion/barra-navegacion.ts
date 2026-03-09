import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../common/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-navegacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra-navegacion.html',
  styles: [],
})
export class BarraNavegacion {
  private authService = inject(AuthService);
  private router = inject(Router);
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.isMenuOpen = false;
    this.router.navigateByUrl('/');
  }
}
