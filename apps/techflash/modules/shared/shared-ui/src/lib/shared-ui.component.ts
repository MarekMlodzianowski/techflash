import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'lib-shared-ui',
	imports: [CommonModule],
	template: `
		<p>SharedUi works!</p>
	`,
	styles: `
    :host {
      display: block;
    }
  `,
	encapsulation: ViewEncapsulation.Emulated,
})
export class SharedUiComponent {}
