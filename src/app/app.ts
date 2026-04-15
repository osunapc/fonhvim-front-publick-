import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './core/services/modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModalComponent],
  template: `
    <router-outlet />
    <app-modal #modalGlobal></app-modal>
  `,
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  @ViewChild('modalGlobal') modalGlobal!: ModalComponent;
  private modalService = inject(ModalService);

  ngAfterViewInit() {
    this.modalService.registrar(this.modalGlobal);
  }
}
