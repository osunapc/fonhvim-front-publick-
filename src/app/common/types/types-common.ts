export interface Usuario {
  id?: number;
  email: string;
  nombre?: string;
  contraseña: string;
  rol: string;
}

export interface FormData {
  email: string;
  contraseña: string;
}

export interface Session {
  access_token: string;
}
