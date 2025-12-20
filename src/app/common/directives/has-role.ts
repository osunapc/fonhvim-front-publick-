import { Directive, Input, OnInit, OnDestroy, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AuthService } from '../../components/common/auth/auth.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appHasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly templateRef = inject(TemplateRef<any>);
  private readonly viewContainer = inject(ViewContainerRef);
  private userRoleSubscription?: Subscription;

  @Input('appHasRole') allowedRoles: string[] = [];

  ngOnInit(): void {
    this.userRoleSubscription = this.authService.getUserRole().subscribe(userRole => {
      this.viewContainer.clear();
      if (userRole && this.allowedRoles.includes(userRole)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnDestroy(): void {
    this.userRoleSubscription?.unsubscribe();
  }
}
