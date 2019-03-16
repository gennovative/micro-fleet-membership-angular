import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountDetailsResolver, RoleDetailsResolver, ProfileDetailsResolver } from './helpers/details.resolver';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesDetailComponent } from './roles-detail/roles-detail.component';
import { RolesCreateComponent } from './roles-create/roles-create.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
	{
		path: 'list',
		component: AccountListComponent,
	},
	{
		path: 'details/:id',
		component: AccountDetailComponent,
		resolve: [AccountDetailsResolver],
	},
	{
		path: 'create',
		component: AccountCreateComponent,
	},
	{
		path: 'profile',
		component: ProfileComponent,
		resolve: [ProfileDetailsResolver],
	},
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
	{
		path: 'roles/list',
		component: RolesListComponent,
	},
	{
		path: 'roles/details/:id',
		component: RolesDetailComponent,
		resolve: [RoleDetailsResolver],
	},
	{
		path: 'roles/create',
		component: RolesCreateComponent,
	},
	{ path: 'roles', redirectTo: 'roles/list', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AccountRoutingModule { }
