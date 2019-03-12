import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// For stack-menu.component
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import {
	FooterComponent,
	HeaderComponent,
	SidebarComponent,
	GgmStackMenuComponent,
	DesktopUnresponsiveLayoutComponent,
	MobileLayoutComponent,
	GgmLayoutComponent,
	GgmLayoutSidebarComponent,
	GgmLayoutContentComponent,
	GgmLayoutHeaderComponent,
	GgmLayoutFooterComponent,

	GgmSidebarService,
} from './layouts';


const BASE_MODULES = [ CommonModule, RouterModule ];

const COMPONENTS = [
	HeaderComponent,
	FooterComponent,
	SidebarComponent,
	GgmStackMenuComponent,

	DesktopUnresponsiveLayoutComponent,
	MobileLayoutComponent,
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
