import { NgModule } from '@angular/core';

import { SharedModule } from '@@shared/shared.module';
import { ThemeModule } from '../theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DesktopPageComponent } from './page-desktop.component';
import { MobilePageComponent } from './page-mobile.component';
import { PageRoutingModule } from './page-routing.module';

@NgModule({
	imports: [
		SharedModule,
		DashboardModule,
		PageRoutingModule,
		ThemeModule,
	],
	declarations: [
		DesktopPageComponent,
		MobilePageComponent,
	],
})
export class PageModule {
}
