import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const LINKS = [
	{ label: 'Home', route: '/', icon: 'dashboard' },
	{ label: 'Sandbox', route: '/sandbox', icon: 'sports_esports' },
] as const;

@Component({
	selector: 'tech-main-menu',
	imports: [CommonModule, RouterLink, MatIconModule],
	host: {
		class: 'tile glass',
	},
	template: `
		<nav>
			<ul class="flex gap-8">
				@for (item of links; track item) {
				<li>
					<a
						[routerLink]="[item.route]"
						class="flex gap-4 a-center"
					>
						@if(item.icon){
						<mat-icon [fontIcon]="item.icon" />
						}
						{{ item.label }}
					</a>
				</li>
				}
			</ul>
		</nav>
	`,
	styles: `
    :host {
      display: block;
      .mat-icon {
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  `,
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenuComponent {
	links = LINKS;
}
