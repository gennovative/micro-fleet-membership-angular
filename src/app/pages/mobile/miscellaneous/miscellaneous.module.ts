import { NgModule } from '@angular/core';
import { MiscellaneousRoutingModule, routedComponents } from './miscellaneous-routing.module';

@NgModule({
	imports: [
		MiscellaneousRoutingModule,
	],
	declarations: [
		...routedComponents,
	],
})
export class MiscellaneousModule { }
