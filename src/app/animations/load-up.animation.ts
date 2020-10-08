import { trigger, transition, style, animate, query, stagger } from "@angular/animations";

export const load_up = trigger('listAnimation', [
    transition('* => *', [
        query(':enter', [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(90, [
                animate('0.5s ease-out', style({ opacity: 1, transform: 'none' }))
            ])
        ], { optional: true })
    ])
]);