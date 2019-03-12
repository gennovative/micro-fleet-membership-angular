import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';


export const NB_CORE_PROVIDERS = [
	...DataModule.forRoot().providers,
	AnalyticsService,
];

/**
 * Provides only services used by other modules in entire application.
 * CoreModule should only be imported by AppModule, so that its (singleton) services
 * are available for all modules in app.
 */
@NgModule({
	imports: [
		CommonModule,
	],
	exports: [
	],
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		throwIfAlreadyLoaded(parentModule, 'CoreModule');
	}

	public static forRoot(): ModuleWithProviders {
		return <ModuleWithProviders>{
			ngModule: CoreModule,
			providers: [
				...NB_CORE_PROVIDERS,
			],
		};
	}
}
