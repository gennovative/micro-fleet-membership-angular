import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthRedirectGuard } from '@@shared/guards/auth-redirect.guard';

const routes: Routes = [
	{
		path: '',
		loadChildren: './pages/page.module#PageModule',
		canActivateChild: [AuthRedirectGuard],
	},
	{
		path: 'auth',
		loadChildren: './pages/auth/auth.module#AuthModule',
	},
	{ path: '**', redirectTo: 'pages', pathMatch: 'full' },
];

const config: ExtraOptions = {
	useHash: true,
};

@NgModule({
	imports: [RouterModule.forRoot(routes, config)],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
