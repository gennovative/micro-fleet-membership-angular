import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../pages/auth/auth.service';
import { StorageService } from '@@core/services/storage.service';
import { SessionService } from '@@core/services/session.service';
import { ApiRequestService } from '@@core/services/api-request.service';
import { AuthGuard } from '@@shared/guards/auth.guard';
import { AuthInterceptor } from '@@shared/helpers/auth.interceptor';
import { LoggedOutGuard } from '@@shared/guards/logged-out-guard';
import { AuthRedirectGuard } from '@@shared/guards/auth-redirect.guard';
import { ErrorsInterceptor } from '@@shared/helpers/errors.interceptor';

import { EventService } from '../services/events.service';
import { AccountService } from '../services/account.service';
import { TicketService } from '../services/ticket.service';
import { AccountDetailsResolver, RoleDetailsResolver, ProfileDetailsResolver } from '../services/helpers/details.resolver';
import { TicketComboService } from '../services/ticket-combo.service';
import { RoleService } from '../services/role.service';

const SERVICES = [
	AccountService,
	ApiRequestService,
	AuthInterceptor,
	AuthGuard,
	AuthRedirectGuard,
	AuthService,
	AccountDetailsResolver,
	ConfirmationService,
	EventService,
	ErrorsInterceptor,
	LoggedOutGuard,
	MessageService,
	ProfileDetailsResolver,
	TicketService,
	TicketComboService,
	RoleDetailsResolver,
	RoleService,
	SessionService,
	StorageService,
];

@NgModule({
	imports: [
		CommonModule,
	],
	providers: [
		...SERVICES,
	],
})
export class DataModule {
	public static forRoot(): ModuleWithProviders {
		return <ModuleWithProviders>{
			ngModule: DataModule,
			providers: [
				...SERVICES,
			],
		};
	}
}
