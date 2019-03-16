import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// For stack-menu.component
import { SharedModule } from '../shared/shared.module';

import {
	FooterComponent,
	HeaderComponent,
	SidebarComponent,
	GgmStackMenuComponent,
	MainLayoutComponent,
	GgmLayoutComponent,
	GgmLayoutSidebarComponent,
	GgmLayoutContentComponent,
	GgmLayoutHeaderComponent,
	GgmLayoutFooterComponent,

	GgmSidebarService,
} from './layouts/desktop';

const BASE_MODULES = [ CommonModule, RouterModule ];

const COMPONENTS = [
	HeaderComponent,
	FooterComponent,
	SidebarComponent,
	GgmStackMenuComponent,

	MainLayoutComponent,
	GgmLayoutComponent,
	GgmLayoutSidebarComponent,
	GgmLayoutContentComponent,
	GgmLayoutHeaderComponent,
	GgmLayoutFooterComponent,
];

@NgModule({
	imports: [
		...BASE_MODULES,
		SharedModule,
	],
	exports: [
		...BASE_MODULES,
		...COMPONENTS,
	],
	declarations: [
		...COMPONENTS,
	],
})
export class ThemeModule {
	public static forRoot(): ModuleWithProviders {
		return <ModuleWithProviders>{
			ngModule: ThemeModule,
			providers: [
				GgmSidebarService,
			],
		};
	}
}
