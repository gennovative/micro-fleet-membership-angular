import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { SharedModule } from '@@shared/shared.module';
import { EventCreateComponent } from './event-create/event-create.component';

@NgModule({
	imports: [
		CommonModule,
		EventRoutingModule,
		SharedModule,
	],
	declarations: [EventListComponent, EventDetailComponent, EventCreateComponent],
})
export class EventModule { }
