import {
  trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';


// Routable animations
export const slideInAnimation =
  trigger('routeAnimation', [
    transition('home <=> checkout', [
      style({ opacity: 1}),
      query(':enter', [
        style({ opacity: 1})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ opacity: 0}))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ opacity: 1}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);
