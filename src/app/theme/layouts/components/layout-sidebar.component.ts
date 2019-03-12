import { Component, Input } from '@angular/core';

@Component({
	// tslint:disable-next-line:component-selector
	selector: '.ggm-layout-sidebar',
	styles: [''],
	template: '<ng-content></ng-content>',
})
export class GgmLayoutSidebarComponent {
	@Input('sidebarName') public name: string;
}
