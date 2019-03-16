import { Component, OnInit } from '@angular/core';
import { TicketComboService } from '../ticket-combo.service';
import { ColumnTable } from '../../../data-types/column-table';
import { VMTable } from '../../view-models/vm-table';
import { ConfirmationService } from 'primeng/api';

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
