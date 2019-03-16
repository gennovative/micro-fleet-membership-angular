import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketComboRoutingModule } from './ticket-combo-routing.module';
import { TicketComboListComponent } from './ticket-combo-list/ticket-combo-list.component';
import { TicketComboDetailComponent } from './ticket-combo-detail/ticket-combo-detail.component';
import { TicketComboCreateComponent } from './ticket-combo-create/ticket-combo-create.component';
import { SharedModule } from '@@shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		TicketComboRoutingModule,
		SharedModule,
	],
	declarations: [TicketComboListComponent, TicketComboDetailComponent, TicketComboCreateComponent],
	providers: [{provide: LOCALE_ID, useValue: 'en-US' }],
})
export class TicketComboModule { }
