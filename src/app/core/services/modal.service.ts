import { Injectable, inject } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modal: ModalComponent | null = null;

  registrar(modal: ModalComponent) {
    this.modal = modal;
  }

  alert(titulo: string, mensaje: string, tipo: 'success' | 'error' | 'warning' | 'info' = 'info') {
    if (this.modal) {
      this.modal.abrir(titulo, mensaje, tipo);
    }
  }

  confirm(titulo: string, mensaje: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.modal) {
        this.modal.titulo = titulo;
        this.modal.mensaje = mensaje;
        this.modal.tipo = 'confirm';
        this.modal.textoConfirmar = 'Sí';
        this.modal.textoCancelar = 'No';
        this.modal.isOpen = true;

        const onConfirm = () => {
          this.modal!.confirmar.unsubscribe();
          this.modal!.cancelar.unsubscribe();
          resolve(true);
        };

        const onCancel = () => {
          this.modal!.confirmar.unsubscribe();
          this.modal!.cancelar.unsubscribe();
          resolve(false);
        };

        this.modal.confirmar.subscribe(onConfirm);
        this.modal.cancelar.subscribe(onCancel);
      } else {
        resolve(window.confirm(mensaje));
      }
    });
  }

  success(mensaje: string, titulo = 'Éxito') {
    this.alert(titulo, mensaje, 'success');
  }

  error(mensaje: string, titulo = 'Error') {
    this.alert(titulo, mensaje, 'error');
  }

  warning(mensaje: string, titulo = 'Advertencia') {
    this.alert(titulo, mensaje, 'warning');
  }

  info(mensaje: string, titulo = 'Información') {
    this.alert(titulo, mensaje, 'info');
  }
}
