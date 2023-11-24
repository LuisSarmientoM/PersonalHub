import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AclService } from '@services/acl.service';

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective {
  roles!: string[];

  constructor(
    private aclService: AclService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  set hasRole(val: string | string[]) {
    console.log(val);

    if (val === '*') {
      this.createView();
      return;
    }
    this.roles = Array.isArray(val) ? val : [val];

    this.updateView();
  }

  /**
   * Update view to keep or delete current element.
   */
  private updateView() {
    if (this.aclService.isRole(this.roles)) {
      this.createView();
    } else {
      this.viewContainer.clear();
    }
  }

  private createView() {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}

// <p *ngIf="true"></p>
