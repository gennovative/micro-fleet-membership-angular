import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { LoggedOutGuard } from '@@shared/guards/logged-out-guard';
import { AuthGuard } from '@@shared/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [LoggedOutGuard],
	},
	{
		path: 'logout',
		component: LogoutComponent,
		canActivate: [AuthGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})

export class AuthRoutingModule { }
