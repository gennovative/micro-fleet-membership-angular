import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { SharedModule } from '@@shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		TicketRoutingModule,
		SharedModule,
	],
	declarations: [TicketListComponent, TicketDetailComponent, TicketCreateComponent],
	providers: [{provide: LOCALE_ID, useValue: 'en-US' }],
})
export class TicketModule { }
