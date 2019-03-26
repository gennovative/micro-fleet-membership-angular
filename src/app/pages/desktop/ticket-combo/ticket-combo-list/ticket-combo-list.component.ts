import { Component, OnInit } from '@angular/core';
import { ColumnTable } from '../../../data-types/column-table';
import { VMTable } from '@@core/view-models/vm-table';
import { ConfirmationService } from 'primeng/api';
import { TicketComboService } from '@@core/services/ticket-combo.service';

@Component({
	selector: 'ggm-ticket-combo-list',
	templateUrl: './ticket-combo-list.component.html',
	styleUrls: ['./ticket-combo-list.component.scss'],
})
export class TicketComboListComponent extends VMTable implements OnInit {

	public cols: ColumnTable[] = [
		{ field: 'name', header: 'Ticket name' },
		{ field: 'price', header: 'Price' },
		{ field: 'description', header: 'Descriptions' },
	];
	protected idField: string = 'id';

	constructor(
		private _ticketComboService: TicketComboService,
		private _confirmService: ConfirmationService,
	) {
		super(_ticketComboService, _confirmService);
	}

	public ngOnInit() {
	}
}
