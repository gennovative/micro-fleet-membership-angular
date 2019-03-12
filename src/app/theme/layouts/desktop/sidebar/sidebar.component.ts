import { Component, Input } from '@angular/core';

import { MenuItem } from 'primeng/api';


@Component({
	selector: 'ggm-sidebar',
	styleUrls: ['./sidebar.component.scss'],
	templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
	@Input()
	public items: MenuItem[];
}
