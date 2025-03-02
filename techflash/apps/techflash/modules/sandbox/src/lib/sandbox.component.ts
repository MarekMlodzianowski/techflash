import { afterNextRender, Component, DestroyRef, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxService } from './sandbox.service';

const toString = (val: any) => `${val ?? ''}`;

@Component({
	selector: 'tech-techflash-sandbox',
	imports: [CommonModule],
	template: `
		<div class="flex col gap-12">
			<h2 class="title">{{ helloWorld() }}</h2>
			<p>TechflashSandbox works!</p>
		</div>
	`,

	host: {
		class: 'flex column gap-24 tile glass',
	},
	styles: `
    :host {
      display: block;
      .title {
        margin:0;
      }
    }
  `,
})
export class SandboxComponent {
	name = input('', { transform: toString });

	service = inject(SandboxService);
	destroyRef = inject(DestroyRef);

	helloWorld = this.service.getHelloWorld();

	constructor() {
		afterNextRender(() => {
			console.log('afterNextRender');
			if (this.name()) this.service.setName(this.name());
		});

		this.destroyRef.onDestroy(() => {
			this.service.setName('...');
		});
	}
}
