import { Component } from '@angular/core';
import { Encabezado } from '../../components/encabezado/encabezado';
import { BarraNavegacion } from '../../components/barra-navegacion/barra-navegacion';
import { SeccionPrincipal } from '../../components/seccion-principal/seccion-principal';
import { Login } from '../../components/login/login';
import { Registro } from '../../components/registro/registro';



@Component({
  selector: 'app-pagina-inicio',
  standalone: true,
  imports: [
    Encabezado,
    BarraNavegacion,
    SeccionPrincipal,
    Login,
    Registro
],
  templateUrl: './home.html',
  styles: [],
})
export class Home {
  currentYear = new Date().getFullYear();
  showLogin = false;
  showRegister = false;
}
