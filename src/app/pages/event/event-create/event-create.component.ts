import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EventService } from '../events.service';
import { Event } from '../models/event';
import { Location } from '@angular/common';
import { ColumnTable } from '../../data-types/column-table';
import { ControlsConfig } from '../../data-types/controls-config';

@Component({
	selector: 'ggm-event-create',
	templateUrl: './event-create.component.html',
	styleUrls: ['./event-create.component.scss'],
})
export class EventCreateComponent implements OnInit {

	@Input('idField')
	private idField: string;

	public cols: ColumnTable[] = [
		{ field: 'position', header: 'Position', display: 'table-cell' },
		{ field: 'name', header: 'Name', display: 'table-cell' },
		{ field: 'weight', header: 'Weight', display: 'table-cell' },
		{ field: 'symbol', header: 'Symbol', display: 'table-cell' },
	];
	private newService: Event;
	public isAddEventSuccess: boolean;
	private submitted: boolean;
	public userform: FormGroup;

	constructor(private fb: FormBuilder,
		private eventService: EventService,
		public location: Location,
		) {
	}

	public ngOnInit() {
		this.newService = new Event();

		let controlsConfig: ControlsConfig = {};
		this.cols.forEach(element => {
			if (element.field !== this.idField) {
				controlsConfig[element.field] = new FormControl('', Validators.required);
			}
		});
		this.userform = this.fb.group(controlsConfig);
	}

	public onSubmit(value: string) {
		console.log(`onSubmit value = ${value}`);
		this.submitted = true;
	}

	public addElement() {
		console.log(`addElement`);
		this.cols.forEach(element => {
			if (this.userform.get(element.field))
				this.newService[element.field] = this.userform.get(element.field).value;
		});
		// this.eventService.add(this.newService).then(res => {
		// 	this.isAddEventSuccess = res;
		// 	// this.newService = {};
		// 	this.location.back();
		// });
	}

}
