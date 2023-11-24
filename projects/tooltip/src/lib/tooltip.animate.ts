import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
export const tooltipAnimations: {
  readonly tooltipState: AnimationTriggerMetadata;
} = {
  tooltipState: trigger('state', [
    state(
      'initial, void, hidden',
      style({ opacity: 0, transform: 'scale(0.8)' })
    ),
    state('visible', style({ transform: 'scale(1)' })),
    transition('* => visible', animate('15000ms cubic-bezier(0, 0, 0.2, 1)')),
    transition('* => hidden', animate('7500ms cubic-bezier(0.4, 0, 1, 1)')),
  ]),
};
