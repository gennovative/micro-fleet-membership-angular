import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@@shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
	imports: [
		CommonModule,

		AuthRoutingModule,
		SharedModule,
	],

	declarations: [
		LoginComponent,
		LogoutComponent,
	],
	providers: [{provide: LOCALE_ID, useValue: 'en-US' }],
})

export class AuthModule { }
