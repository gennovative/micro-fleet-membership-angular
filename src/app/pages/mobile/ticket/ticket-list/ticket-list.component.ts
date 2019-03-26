import { Component, OnInit } from '@angular/core';
import { ColumnTable } from '../../../data-types/column-table';
import { VMTable } from '@@core/view-models/vm-table';
import { ConfirmationService } from 'primeng/api';
import { TicketService } from '@@core/services/ticket.service';

@Component({
	selector: 'ggm-ticket-list',
	templateUrl: './ticket-list.component.html',
	styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent extends VMTable implements OnInit {

	public cols: ColumnTable[] = [
		{ field: 'name', header: 'Ticket name' },
		{ field: 'price', header: 'Price' },
		{ field: 'description', header: 'Descriptions' },
	];
	protected idField: string = 'id';

	constructor(
		private _ticketService: TicketService,
		private _confirmService: ConfirmationService,
	) {
		super(_ticketService, _confirmService);
	}

	public ngOnInit() {
	}
}
