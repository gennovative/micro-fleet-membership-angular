import { Component, OnInit } from '@angular/core';
import { ControlsConfig } from '../../../data-types/controls-config';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../ticket/ticket.service';
import { Ticket } from '../models/ticket';
import { Location } from '@angular/common';
import { GGMUtil } from '@@core/utils/ggm-util';

@Component({
	selector: 'ggm-ticket-detail',
	templateUrl: './ticket-detail.component.html',
	styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent implements OnInit {

	public userform: FormGroup;
	private controlsConfig: ControlsConfig = {
		['name']: new FormControl('', Validators.required),
		['price']: new FormControl('', Validators.required),
		['codePrefix']: new FormControl('', Validators.required),
		['description']: new FormControl(),
		['isEnabled']: new FormControl(),
	};

	public get name(): AbstractControl {
		return this.userform.get('name');
	}

	public get price(): AbstractControl {
		return this.userform.get('price');
	}

	public get codePrefix(): AbstractControl {
		return this.userform.get('codePrefix');
	}

	public get description(): AbstractControl {
		return this.userform.get('description');
	}

	public get isEnabled(): AbstractControl {
		return this.userform.get('isEnabled');
	}

	private ticket: Ticket;
	// private ticketItems: SelectItem[] = [];

	constructor(protected activeRouter: ActivatedRoute,
		protected messageService: MessageService,
		public location: Location,
		protected formBuilder: FormBuilder,
		private ticketService: TicketService,
	) {
		this.userform = this.formBuilder.group(this.controlsConfig);
		const id = this.activeRouter.snapshot.paramMap.get('id');
		console.log(`get detail get id = ${id}`);
		if (this.ticketService) {
			this.ticketService.get(id).subscribe(res => {
				this.ticket = new Ticket(res);

				this.name.setValue(res.name);
				this.price.setValue(res.price);
				this.description.setValue(res.description);
				this.codePrefix.setValue(res.codePrefix);
				this.isEnabled.setValue(res.isEnabled);

				console.log(JSON.stringify(res));
			});
		}
	}

	public ngOnInit() {
	}

	public onSave(value: object) {
		// let ticket = new Ticket(value);
		this.ticket.clone(value);
		this.ticket.price = GGMUtil.changeMoneyToNumber(value['price']);
		console.log(`this.userform.values = ${JSON.stringify(this.ticket)}`);

		this.ticketService.update(this.ticket).subscribe(res => {
			if (res) {
				console.log('Update ticket success!');
				this.messageService.add({severity: 'success', summary: 'Update Ticket Success!'});
			} else {
				this.messageService.add({severity: 'error', summary: 'Connection Lose!'});
			}
		}, err => {
			this.messageService.add({severity: 'error', summary: err.statusText});
		});
	}

	public transferFormatNumber(): number {
		if (this.userform && this.price) {
			return GGMUtil.changeMoneyToNumber(this.price.value);
		}
		else
			return null;
	}
}
