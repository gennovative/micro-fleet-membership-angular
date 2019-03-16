import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorDetailComponent } from './visitor-detail/visitor-detail.component';
import { VisitorListComponent } from './visitor-list/visitor-list.component';


export const routes: Routes = [
	{
		path: '',
		component: VisitorListComponent,
	},
	{
		path: ':id',
		component: VisitorDetailComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class VisitorRoutingModule { }
