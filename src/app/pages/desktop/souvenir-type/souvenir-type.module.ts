import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SouvenirTypeRoutingModule } from './souvenir-type-routing.module';
import { SouvenirTypeCreateComponent } from './souvenir-type-create/souvenir-type-create.component';
import { SouvenirTypeDetailComponent } from './souvenir-type-detail/souvenir-type-detail.component';
import { SouvenirTypeListComponent } from './souvenir-type-list/souvenir-type-list.component';
import { SharedModule } from '@@shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		SouvenirTypeRoutingModule,
		SharedModule,
	],
	declarations: [SouvenirTypeCreateComponent, SouvenirTypeDetailComponent, SouvenirTypeListComponent],
})
export class SouvenirTypeModule { }
