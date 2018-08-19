import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export const calendarAnimation = [
  trigger('calendarAnim', [
    state('false, void', style({opacity: .2, transform: 'scale(.6, .6)'})),
    state('true', style({opacity: 1, transform: 'scale(1, 1)'})),
    transition(':enter', animate('200ms')),
    transition(':leave', animate('200ms')),
  ]),
  trigger('writerAnim', [
    state('false, void', style({opacity: 0, transform: 'scale(0, 0) translateY(-50px)'})),
    state('true', style({opacity: 1, transform: 'scale(1, 1) translateY(0)'})),
    transition(':enter', animate('200ms', keyframes([
      style({offset: 0, opacity: 0, transform: 'scale(0, 0) translateY(-50px)'}),
      style({offset: .1, opacity: 0, transform: 'scale(1, 1) translateY(-50px)'}),
      style({offset: 1, opacity: 1, transform: 'scale(1, 1) translateY(0)'}),
    ]))),
    transition(':leave', animate('200ms', keyframes([
      style({offset: 0, opacity: 1, transform: 'scale(1, 1) translateY(0)'}),
      style({offset: .9, opacity: 0, transform: 'scale(1, 1) translateY(-50px)'}),
      style({offset: 1, opacity: 0, transform: 'scale(0, 0) translateY(-50px)'}),
    ]))),
  ]),
];
