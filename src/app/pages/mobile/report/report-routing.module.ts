import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitorExperienceComponent } from './visitor-experience/visitor-experience.component';
import { TicketReportComponent } from './ticket-report/ticket-report.component';
import { RevenueReportComponent } from './revenue-report/revenue-report.component';

const routes: Routes = [
	{
		path: 'ticket',
		component: TicketReportComponent,
	},
	{
		path: 'revenue',
		component: RevenueReportComponent,
	},
	{
		path: 'visitors-experience',
		component: VisitorExperienceComponent,
	},
	{
		path: '',
		redirectTo: 'ticket',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ReportRoutingModule { }
