import { Directive, ElementRef, effect, input } from '@angular/core';

@Directive({
	selector: '[techDummy]',
})
export class DummyDirective {
	readonly techDummy = input<boolean>();

	constructor(private el: ElementRef) {
		effect(() => {
			this.el.nativeElement.style.filter = this.techDummy() ? 'blur(15px)' : 'none';
		});

		// afterNextRender(() => {
		// 	this.el.nativeElement.style.backgroundColor = this.techDummy();
		// });
	}
}
