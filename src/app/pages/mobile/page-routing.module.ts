import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '@@shared/guards/auth.guard';
import { PageComponent } from './page.component';

const routes: Routes = [{
	path: '',
	component: PageComponent,
	children: [
		{
			path: 'accounts',
			loadChildren: './account/account.module#AccountModule',
		},
		{
			path: 'dashboard',
			component: DashboardComponent,
		},
		{
			path: 'events',
			loadChildren: './event/event.module#EventModule',
		},
		{
			path: 'roles',
			loadChildren: './account/account.module#AccountModule',
		},
		{
			path: 'tickets',
			loadChildren: './ticket/ticket.module#TicketModule',
		},
		{
			path: 'combos',
			loadChildren: './ticket-combo/ticket-combo.module#TicketComboModule',
		},
		{
			path: 'souvenir',
			loadChildren: './souvenir/souvenir.module#SouvenirModule',
		},
		{
			path: 'souvenir-type',
			loadChildren: './souvenir-type/souvenir-type.module#SouvenirTypeModule',
		},
		{
			path: 'reports',
			loadChildren: './report/report.module#ReportModule',
		},
		{
			path: '',
			redirectTo: 'dashboard',
			pathMatch: 'full',
		},
	],
	canActivateChild: [AuthGuard],
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PageRoutingModule {
}
