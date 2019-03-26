import { Component } from '@angular/core';
import { ColumnTable } from '../../../data-types/column-table';
import { VMTable } from '@@core/view-models/vm-table';
import { ConfirmationService } from 'primeng/api';
import { EventService } from '@@core/services/events.service';

@Component({
	selector: 'ggm-event-list',
	templateUrl: './event-list.component.html',
	styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent extends VMTable {

	public cols: ColumnTable[] = [
			{ field: 'position', header: 'Position', display: 'table-cell' },
			{ field: 'name', header: 'Name', display: 'table-cell' },
			{ field: 'weight', header: 'Weight', display: 'table-cell' },
			{ field: 'symbol', header: 'Symbol', display: 'table-cell' },
		];
	protected idField: string = 'position';

	constructor(
		private _eventService: EventService,
		private _confirmService: ConfirmationService,
	) {
		super(_eventService, _confirmService);
	}
}
