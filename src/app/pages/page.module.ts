import { NgModule } from '@angular/core';

import { SharedModule } from '@@shared/shared.module';
import { ThemeModule } from '../theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PageComponent } from './page-desktop.component';
import { PageRoutingModule } from './page-routing.module';

@NgModule({
	imports: [
		SharedModule,
		DashboardModule,
		PageRoutingModule,
		ThemeModule,
	],
	declarations: [PageComponent],
})
export class PageModule {
}
