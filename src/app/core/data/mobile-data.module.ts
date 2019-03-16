import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { EventService } from '../../pages/mobile/event/events.service';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../pages/mobile/account/account.service';
import { TicketService } from '../../pages/mobile/ticket/ticket.service';
import { AuthService } from '../../pages/auth/auth.service';
import { StorageService } from '@@core/services/storage.service';
import { SessionService } from '@@core/services/session.service';
import { ApiRequestService } from '@@core/services/api-request.service';
import { AuthGuard } from '@@shared/guards/auth.guard';
import { AuthInterceptor } from '@@shared/helpers/auth.interceptor';
import { LoggedOutGuard } from '@@shared/guards/logged-out-guard';
import { AuthRedirectGuard } from '@@shared/guards/auth-redirect.guard';
import { AccountDetailsResolver, RoleDetailsResolver, ProfileDetailsResolver } from '../../pages/mobile/account/helpers/details.resolver';
import { TicketComboService } from '../../pages/mobile/ticket-combo/ticket-combo.service';
import { RoleService } from '../../pages/mobile/account/role.service';
import { ErrorsInterceptor } from '@@shared/helpers/errors.interceptor';
import { ConfirmationService } from 'primeng/api';


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
	UserService,
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
