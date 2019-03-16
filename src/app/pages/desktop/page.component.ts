import { Component } from '@angular/core';

import { MENU_ITEMS } from './menu-settings';

@Component({
	selector: 'ggm-page',
	template: `
		<ggm-main-layout>
			<ggm-stack-menu class="main-menu" [items]="menu"></ggm-stack-menu>
			<router-outlet></router-outlet>
		</ggm-main-layout>
	`,
})
export class PageComponent {
	public menu = MENU_ITEMS;
}
