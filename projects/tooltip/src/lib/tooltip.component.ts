import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  InjectionToken,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationEvent,
} from '@angular/animations';
import { EventEmitter } from 'stream';
import { Observable, Subject } from 'rxjs';

export type TooltipData = string | TemplateRef<void>;
export const TOOLTIP_DATA = new InjectionToken<TooltipData>(
  'Data to display in tooltip'
);

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [NgTemplateOutlet],
  // encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('tooltipState', [
      state(
        'void, hidden',
        style({
          opacity: 0,
          transform: 'scale(0.85)',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          transform: 'scale(1)',
        })
      ),
      transition(
        'void => visible, visible => hidden',
        animate('150ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  template: `
    <div
      class="tooltip"
      [@tooltipState]="state"
      (@tooltipState.done)="onAnimationDone($event)"
    >
      @if (asString) {
      <ng-container>
        {{ asString }}
      </ng-container>
      } @else if (asTemplate) {
      <ng-container>
        <ng-template [ngTemplateOutlet]="asTemplate"></ng-template>
      </ng-container>
      }
    </div>
  `,
  host: {},
  styles: `
  .tooltip {
    display: block;
    max-width: 12rem;
    padding: 0.7rem;
    font-size: 0.85rem;
    color: #fff;
    background: #000;
    border-radius: 0.25rem;
    box-sizing: border-box;
  }

  :host-context(.top) {
    margin-bottom: 0.5rem;
  }

  :host-context(.bottom) {
    margin-top: 0.5rem;
  }
  `,
})
export class TooltipComponent {
  state: 'void' | 'visible' | 'hidden' = 'void';

  animationDone = new Subject<void>();

  get asString(): string | false {
    return typeof this.tooltipData === 'string' ? this.tooltipData : false;
  }

  get asTemplate(): TemplateRef<void> | false {
    return this.tooltipData instanceof TemplateRef ? this.tooltipData : false;
  }

  constructor(@Inject(TOOLTIP_DATA) public tooltipData: TooltipData) {}

  show(): void {
    this.state = 'visible';
  }

  hide(): void {
    this.state = 'hidden';
  }

  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'hidden') {
      this.animationDone.next();
    }

    // if (event.toState === 'hidden') {
    // }
  }
}
