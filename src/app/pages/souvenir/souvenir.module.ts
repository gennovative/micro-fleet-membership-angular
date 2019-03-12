import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SouvenirRoutingModule } from './souvenir-routing.module';
import { SouvenirCreateComponent } from './souvenir-create/souvenir-create.component';
import { SouvenirDetailComponent } from './souvenir-detail/souvenir-detail.component';
import { SouvenirListComponent } from './souvenir-list/souvenir-list.component';
import { SharedModule } from '@@shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		SouvenirRoutingModule,
		SharedModule,
	],
	declarations: [
		SouvenirCreateComponent,
		SouvenirDetailComponent,
		SouvenirListComponent,
	],
})
export class SouvenirModule { }
