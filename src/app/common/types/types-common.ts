export interface Usuario {
  id?: number;
  email: string;
  nombre?: string;
  contraseña: string;
  rol: string;
  municipio?: string;
  parroquia?: string;
}

export interface FormData {
  email: string;
  contraseña: string;
}

export interface Session {
  access_token: string;
}
