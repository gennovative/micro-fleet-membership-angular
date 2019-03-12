import { Component, OnInit } from '@angular/core';
import { ControlsConfig } from '../../data-types/controls-config';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Ticket } from '../models/ticket';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../ticket.service';
import { Location } from '@angular/common';
import { GGMUtil } from '@@core/utils/ggm-util';

@Component({
	selector: 'ggm-ticket-create',
	templateUrl: './ticket-create.component.html',
	styleUrls: ['./ticket-create.component.scss'],
})
export class TicketCreateComponent implements OnInit {

	private controlsConfig: ControlsConfig = {
		['name']: new FormControl('', Validators.required),
		['codePrefix']: new FormControl('', Validators.required),
		['price']: new FormControl('', Validators.compose([ Validators.required, Validators.pattern('^[0-9,.]*') ])),
		['description']: new FormControl(''),
		['isEnabled']: new FormControl(true),
	};

	public get price(): AbstractControl {
		return this.userform.controls['price'];
	}

	public userform: FormGroup;
	// private ticket: Ticket;
	// private ticketItems: SelectItem[] = [];

	constructor(protected activeRouter: ActivatedRoute,
		protected messageService: MessageService,
		public location: Location,
		protected formBuilder: FormBuilder,
		private ticketService: TicketService,
		) {
		// this.ticket = new Ticket();
		this.userform = this.formBuilder.group(this.controlsConfig);
	}

	public ngOnInit() {
	}

	public createTicket(value: object) {
		if (this.userform.valid) {
			// let objProperties = Object.getOwnPropertyNames(value);
			// objProperties.forEach(prop => {
			// 		this.ticket[prop] = value[prop];
			// });
			let ticket = new Ticket(value);
			// ticket.clone(value);
			ticket.price = GGMUtil.changeMoneyToNumber(ticket.price.toString());
			// this.ticket.isEnabled = this.userform.controls['isEnabled'].value;
			console.log(`ticket = ${JSON.stringify(ticket)}`);

			this.ticketService.add(ticket).subscribe(res => {
				if (res) {
					console.log('Update ticket success!');
					this.messageService.add({severity: 'success', summary: 'Create Ticket Success'});
				} else {
					console.log('Create ticket fail!!!');
					this.messageService.add({severity: 'error', summary: 'Create Ticket Error!'});
				}
			}, err => {
				this.messageService.add({severity: 'error', summary: err.statusText});
			});
		}
	}

	public transferFormatNumber(): number {
		if (this.userform && this.price) {
			return GGMUtil.changeMoneyToNumber(this.price.value);
		}
		else
			return null;
	}
}
