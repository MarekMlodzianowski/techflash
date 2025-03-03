import {
	afterNextRender,
	Component,
	DestroyRef,
	inject,
	input,
	linkedSignal,
	numberAttribute,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxService } from '../sandbox.service';
import { TileComponent } from '@techflash/shared-ui';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Location } from '@angular/common';

export type User = {
	id: number;
	name: string;
	email: string;
	country: string;
	city: string;
	phone: string;
	website: string;
	company?: string;
	companyId: number;
	address: string;
};

@Component({
	selector: 'tech-techflash-sandbox',
	imports: [
		CommonModule,
		TileComponent,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		RouterModule,
		MatButtonModule,
		MatSelectModule,
	],
	templateUrl: './playground.component.html',
	host: {
		class: `flex column gap-24  border-radius--${16 + 8}`,
	},
	styles: `
  :host {
   padding:16px;
   border:solid 1px var(--color-slate);
  .title {
         margin:0;
  }}
    `,
})
export class PlaygroundComponent {
	id = input(undefined, { transform: numberAttribute });

	#service = inject(SandboxService);
	#destroyRef = inject(DestroyRef);
	#location = inject(Location);

	allUsers = this.#service.allUsers();
	userResource = this.#service.getUserResource();
	userCompany = this.#service.getUserCountry();
	relatedUsers = this.#service.getRelatedUsers();

	selectedId = linkedSignal(() => this.id());

	updateUrl(id: number) {
		this.selectedId.set(id);
		this.#service.setId(id);
		this.#location.replaceState(`/sandbox/playground/${id}`);
	}

	constructor() {
		afterNextRender(() => {
			console.log(`afterNextRender - id: ${this.id()}`);
			const id = this.id();
			if (id) this.#service.setId(id);
			this.selectedId.set(id);
		});

		this.#destroyRef.onDestroy(() => {
			this.#service.setId(-1);
		});
	}
}
