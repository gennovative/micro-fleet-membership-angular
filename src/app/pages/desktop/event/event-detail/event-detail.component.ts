import { Component, Injectable, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ColumnTable } from '../../../data-types/column-table';
import { ControlsConfig } from '../../../data-types/controls-config';
import { EventService } from '@@core/services/events.service';

@Component({
	selector: 'ggm-event-detail',
	templateUrl: './event-detail.component.html',
	// template: `<ggm-template-detail
	// 			[service]="eventService"
	// 			[properties]="eventProperties"
	// 			[detailHeader]="eventDetailHeader"
	// 			[controlsConfig]="eventControlsConfig"
	// 			></ggm-template-detail>`,
	styleUrls: ['./event-detail.component.scss'],
})
@Injectable()
export class EventDetailComponent implements OnInit, AfterViewInit {

	private eventProperties: ColumnTable[] = [
		{ field: 'position', header: 'Position', display: 'table-cell' },
		{ field: 'name', header: 'Name', display: 'table-cell' },
		{ field: 'weight', header: 'Weight', display: 'table-cell' },
		{ field: 'symbol', header: 'Symbol', display: 'table-cell' },
	];
	private eventControlsConfig: ControlsConfig = {
		['position']: new FormControl(),
		['name']: new FormControl('', Validators.required),
		['weight']: new FormControl('', Validators.required),
		['symbol']: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
	};
	private eventDetailHeader = 'Detail Event';

	constructor(protected activeRouter: ActivatedRoute,
		protected messageService: MessageService,
		protected location: Location,
		protected formBuilder: FormBuilder,
		private eventService: EventService,
	) {
	}

	public ngOnInit() {
	}

	public ngAfterViewInit() {
		console.log('ngAfterContentChecked');
		// document.getElementById('position').setAttribute('disabled', 'true');
	}

}
