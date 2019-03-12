import { Component, OnInit } from '@angular/core';
import { SessionService } from '@@core/services/session.service';
import { Router } from '@angular/router';

@Component({
	selector: 'ggm-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

	constructor(
		private _sessionService: SessionService,
		private _router: Router,
	) { }

	public ngOnInit() {
		this._sessionService.removeSession();
	}
}
