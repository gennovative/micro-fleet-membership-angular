import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorDetailComponent } from './visitor-detail/visitor-detail.component';
import { VisitorListComponent } from './visitor-list/visitor-list.component';
import { VisitorRoutingModule } from './visitor-routing.module';


@NgModule({
	imports: [
		CommonModule,
		VisitorRoutingModule,
	],
	exports: [
		VisitorDetailComponent,
		VisitorListComponent,
	],
	declarations: [
		VisitorDetailComponent,
		VisitorListComponent,
	],
})
export class VisitorModule { }
