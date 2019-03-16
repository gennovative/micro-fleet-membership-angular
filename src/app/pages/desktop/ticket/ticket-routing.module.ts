import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';

const routes: Routes = [
	{
		path: 'list',
		component: TicketListComponent,
	},
	{
		path: 'detail/:id',
		component: TicketDetailComponent,
	},
	{
		path: 'create',
		component: TicketCreateComponent,
	},
	{
		path: '',
		redirectTo: 'list',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TicketRoutingModule { }
