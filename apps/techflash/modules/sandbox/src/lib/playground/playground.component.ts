import { CommonModule, Location } from '@angular/common';
import {
	afterNextRender,
	Component,
	DestroyRef,
	effect,
	inject,
	input,
	linkedSignal,
	numberAttribute,
	signal,
	untracked,
	viewChild,
	type TemplateRef,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import type { User } from '@shared/types';
import { TileComponent } from '@techflash/shared-ui';
import { debounceTime, fromEvent, map } from 'rxjs';
import { SandboxService } from '../sandbox.service';

@Component({
	selector: 'tech-techflash-sandbox',
	imports: [
		CommonModule,
		TileComponent,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatSelectModule,
		MatDialogModule,
	],
	templateUrl: './playground.component.html',
	host: {
		class: `flex column gap-24 border-radius--${16 + 8}`,
		'[class.mobile]': 'windowSize() < 768',
	},
	styles: `
		:host {
			padding: 16px;
			border: solid 1px var(--color-slate);
			&.mobile {
				margin: 0 16px;
				font-size: 18px;
			}
			.title {
				margin: 0;
			}
		}
	`,
})
export class PlaygroundComponent {
	id = input(undefined, { transform: numberAttribute });

	#service = inject(SandboxService);
	#destroyRef = inject(DestroyRef);
	#location = inject(Location);
	dialog = inject(MatDialog);

	users = this.#service.getAllUsers();
	userResource = this.#service.getUserResource();
	userCompany = this.#service.getUserCompany();
	relatedUsers = this.#service.getRelatedUsers();
	companies = this.#service.getCompanies();
	countries = this.#service.getCountries();

	// @ViewChild('formDialog') formDialog!: TemplateRef<unknown>;
	formDialog = viewChild<TemplateRef<unknown>>('formDialog');
	dialogRef = this.dialog;

	#fb = inject(NonNullableFormBuilder);

	userForm = this.#fb.group({
		name: [''],
		email: [''],
		country: [''],
		city: [''],
		phone: [''],
		website: [''],
		companyId: 0,
		address: [''],
		id: 0,
	});

	// Mozna nadpisac (set / update jak zwykly signal), wroci do default gdy zmieni sie dependency (tutaj id)
	selectedId = linkedSignal(() => this.id());

	windowSize = toSignal(
		fromEvent(window, 'resize').pipe(
			debounceTime(100),
			map(() => window.innerWidth),
		),
		{ initialValue: window.innerWidth },
	);

	userInput = signal('');

	updateUrl(id: number): void {
		this.selectedId.set(id);
		this.#service.setId(id);
		this.#location.replaceState(`/sandbox/playground/${id}`);
	}

	openDialog(): void {
		const formDialog = this.formDialog();
		if (formDialog !== undefined) this.dialogRef.open(formDialog);

		if (this.userResource.hasValue()) {
			this.userForm.patchValue(this.userResource.value());
		}
	}

	dialogSave(formValue: unknown): void {
		console.log(formValue);
		this.userForm.reset();

		if (this.userResource.hasValue()) {
			const updatedUser = {
				...this.userResource.value(),
				...(formValue as Partial<User>),
				id: this.userResource.value().id,
			};

			if (updatedUser.id !== null && updatedUser.companyId !== null) {
				this.#service.updateUserById(updatedUser as User);
				this.dialogRef.closeAll();
			} else {
				console.error('User id or companyId is null');
			}
		}
	}

	constructor() {
		// Przyklad jednorazowego effektu, niszczymy gdy spelni warunek, mozna uzywac do inicjalizacji
		const firstUserEffect = effect(() => {
			const id = this.users.value()?.[0]?.id;
			if (id) {
				untracked(() => {
					this.#service.setId(id);
					this.selectedId.set(id);
					console.log(id);
					firstUserEffect.destroy();
				});
			}
		});

		// https://angular.dev/api/core/afterNextRender#
		// Dobra aternatywa do hookow ngOnInit, ngAfterViewInit, ngAfterContentInit

		afterNextRender({
			read: () => {
				console.log(`afterNextRender - id: ${this.id()}`);
				// 🪄 JavaScript 🪄
				const id = !Number.isNaN(this.id()) ? this.id() : (this.users.value()?.[0]?.id ?? -1);
				console.info(`afterNextRender ${this.users.value()}`);
				if (id) {
					this.#service.setId(id);
					this.selectedId.set(id);
					console.log(id);
				}
			},
		});

		this.#destroyRef.onDestroy(() => {
			this.#service.setId(-1);
		});
	}
}
