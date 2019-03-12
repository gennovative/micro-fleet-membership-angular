import { Component } from '@angular/core';

import { MENU_ITEMS } from './menu-settings';

@Component({
	selector: 'ggm-page',
	template: `
		<ggm-unresponsive-desktop-layout>
			<ggm-stack-menu class="main-menu" [items]="menu"></ggm-stack-menu>
			<router-outlet></router-outlet>
		</ggm-unresponsive-desktop-layout>
	`,
})
export class PageComponent {
	public menu = MENU_ITEMS;
}
