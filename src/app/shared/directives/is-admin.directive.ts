import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[isAdmin]'
})
export class IsAdminDirective {

  @Input() set isAdmin(role: 'ADMIN' | 'USER' | null) {
    if (role === 'ADMIN') {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) { }


}
