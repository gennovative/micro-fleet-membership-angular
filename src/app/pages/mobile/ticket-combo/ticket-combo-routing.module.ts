import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketComboListComponent } from './ticket-combo-list/ticket-combo-list.component';
import { TicketComboDetailComponent } from './ticket-combo-detail/ticket-combo-detail.component';
import { TicketComboCreateComponent } from './ticket-combo-create/ticket-combo-create.component';

const routes: Routes = [
	{
		path: 'list',
		component: TicketComboListComponent,
	},
	{
		path: 'detail/:id',
		component: TicketComboDetailComponent,
	},
	{
		path: 'create-combo',
		component: TicketComboCreateComponent,
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
export class TicketComboRoutingModule { }
