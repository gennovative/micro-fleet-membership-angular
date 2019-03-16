import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { SharedModule } from '@@shared/shared.module';
import { AccountCreateComponent } from './account-create/account-create.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesCreateComponent } from './roles-create/roles-create.component';
import { RolesDetailComponent } from './roles-detail/roles-detail.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
	imports: [
		CommonModule,
		AccountRoutingModule,
		SharedModule,
	],
	declarations: [
		AccountListComponent,
		AccountDetailComponent,
		AccountCreateComponent,
		ProfileComponent,
		RolesListComponent,
		RolesCreateComponent,
		RolesDetailComponent,
	],
})
export class AccountModule { }
