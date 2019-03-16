import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventCreateComponent } from './event-create/event-create.component';

const routes: Routes = [
	{
		path: 'list',
		component: EventListComponent,
	},
	{
		path: 'detail/:id',
		component: EventDetailComponent,
	},
	{
		path: 'create',
		component: EventCreateComponent,
	},
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EventRoutingModule { }
