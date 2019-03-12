import { Component, OnInit } from '@angular/core';

import { AnalyticsService } from './core/utils/analytics.service';


@Component({
	selector: 'ggm-app',
	template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

	constructor(private _analytics: AnalyticsService) {
	}

	public ngOnInit() {
		this._analytics.trackPageViews();
	}
}
