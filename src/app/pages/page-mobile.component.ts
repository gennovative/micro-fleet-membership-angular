import { Component } from '@angular/core';

import { MENU_ITEMS } from './menu-settings';

@Component({
	selector: 'ggm-page',
	template: `
		<ggm-mobile-layout>
			<ggm-stack-menu class="main-menu" [items]="menu"></ggm-stack-menu>
			<router-outlet></router-outlet>
		</ggm-mobile-layout>
	`,
})
export class MobilePageComponent {
	public menu = MENU_ITEMS;
}
