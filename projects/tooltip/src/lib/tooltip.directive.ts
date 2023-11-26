import {
  ConnectedPosition,
  Overlay,
  OverlayRef,
  PositionStrategy,
  ScrollStrategy,
  ScrollDispatcher,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  ViewContainerRef,
  inject,
} from '@angular/core';
import {
  TOOLTIP_DATA,
  TooltipComponent,
  TooltipData,
} from './tooltip.component';
import { AnimationBuilder } from '@angular/animations';
import { tooltipAnimations } from './tooltip.animate';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * TooltipDirective allows you to add a tooltip to any element.
 * The tooltip's content is defined by the `appTooltip` input property.
 *
 * @example
 * <div appTooltip="This is a tooltip">Hover over me</div>
 * <div [appTooltip]="template">Hover over me</div>
 */
@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  @Input() appTooltip!: TooltipData;
  @Input() position: TooltipPosition = 'top';

  // private positionMap: { [key in TooltipPosition]: [ConnectedPosition] } = {
  //   top: [
  //     {
  //       originX: 'center',
  //       originY: 'top',
  //       overlayX: 'center',
  //       overlayY: 'bottom',
  //     },
  //   ],
  //   bottom: [
  //     {
  //       originX: 'center',
  //       originY: 'bottom',
  //       overlayX: 'center',
  //       overlayY: 'top',
  //     },
  //   ],
  //   left: [
  //     {
  //       originX: 'start',
  //       originY: 'center',
  //       overlayX: 'end',
  //       overlayY: 'center',
  //     },
  //   ],
  //   right: [
  //     {
  //       originX: 'end',
  //       originY: 'center',
  //       overlayX: 'start',
  //       overlayY: 'center',
  //     },
  //   ],
  // };

  // @Input() tooltipPosition: ConnectedPosition[] = [
  //   {
  //     originX: 'center',
  //     originY: 'top',
  //     overlayX: 'center',
  //     overlayY: 'bottom',
  //     panelClass: 'top',
  //   },
  //   {
  //     originX: 'center',
  //     originY: 'bottom',
  //     overlayX: 'center',
  //     overlayY: 'top',
  //     panelClass: 'bottom',
  //   },
  //   {
  //     originX: 'start',
  //     originY: 'center',
  //     overlayX: 'end',
  //     overlayY: 'center',
  //     panelClass: 'left',
  //   },
  //   {
  //     originX: 'end',
  //     originY: 'center',
  //     overlayX: 'start',
  //     overlayY: 'center',
  //     panelClass: 'right',
  //   },
  // ];

  private overlayRef: OverlayRef | null = null;
  private element = inject(ElementRef<HTMLElement>);
  private overlay = inject(Overlay);
  private viewContainer = inject(ViewContainerRef);
  private tooltipComponent!: ComponentRef<TooltipComponent>;

  /**
   * This method is triggered when the host element receives a mouseenter or focus event.
   * It is responsible for showing the tooltip.
   */
  @HostListener('mouseenter')
  @HostListener('focus')
  showTooltip(): void {
    if (this.overlayRef?.hasAttached() === true) {
      return;
    }

    this.attachTooltip();

    // Start the enter animation
    this.tooltipComponent.instance.show();
    this.tooltipComponent.instance.animationDone.subscribe(() => {
      // this.tooltipComponent.destroy();
      this.overlayRef?.detach();
    });
  }

  @HostListener('window:scroll')
  updateTooltipPosition(): void {
    if (this.overlayRef?.hasAttached() === true) {
      const positionStrategy = this.getPositionStrategy();
      this.overlayRef.updatePositionStrategy(positionStrategy);
    }
  }

  /**
   * This method is triggered when the host element receives a mouseleave or blur event.
   * It checks if the tooltip overlay is currently attached. If it is, it detaches the overlay,
   * effectively hiding the tooltip.
   */
  @HostListener('mouseleave')
  @HostListener('blur')
  hideTooltip(): void {
    if (this.overlayRef?.hasAttached() === true) {
      this.tooltipComponent.instance.hide();
    }
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }

  /**
   * This method is responsible for attaching the tooltip to the host element.
   * It first checks if the overlayRef is null, if it is, it creates a new overlay with a position strategy.
   * Then it creates an injector with the tooltip data and attaches the TooltipComponent to the overlay.
   */
  private attachTooltip() {
    if (this.overlayRef === null) {
      const positionStrategy = this.getPositionStrategy();
      this.overlayRef = this.overlay.create({ positionStrategy });
    }
    const injector = Injector.create({
      providers: [
        {
          provide: TOOLTIP_DATA,
          useValue: this.appTooltip,
        },
      ],
    });
    const component = new ComponentPortal(
      TooltipComponent,
      this.viewContainer,
      injector
    );
    this.tooltipComponent = this.overlayRef.attach(component);
  }
  /**
   * This method returns a PositionStrategy used for positioning the tooltip.
   * The tooltip is positioned to be flexible connected to the host element.
   * It can be either above or below the host element, centered horizontally.
   */
  private getPositionStrategy(): PositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.element)
      .withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          panelClass: 'top',
        },
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          panelClass: 'bottom',
        },
      ]);
    // .withPositions(this.positionMap[this.position]);
  }
}
