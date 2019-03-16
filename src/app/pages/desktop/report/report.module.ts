import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from '@@shared/shared.module';
import { VisitorExperienceComponent } from './visitor-experience/visitor-experience.component';
import { TicketReportComponent } from './ticket-report/ticket-report.component';
import { RevenueReportComponent } from './revenue-report/revenue-report.component';

@NgModule({
	imports: [
		CommonModule,
		ReportRoutingModule,
		SharedModule,
	],
	declarations: [
		TicketReportComponent,
		VisitorExperienceComponent,
		RevenueReportComponent,
	],
})
export class ReportModule { }
