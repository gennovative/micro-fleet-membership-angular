/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { ThemeModule } from './theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageModule } from './pages/desktop/page.module';
import { AuthInterceptor } from '@@shared/helpers/auth.interceptor';
import { ErrorsInterceptor } from '@@shared/helpers/errors.interceptor';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,

		CoreModule.forRoot(),
		ThemeModule.forRoot(),
		PageModule,
	],
	bootstrap: [AppComponent],
	providers: [
		{ provide: APP_BASE_HREF, useValue: '/' },
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },
	],
})
export class AppModule {
}
