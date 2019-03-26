import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlsConfig } from '../../../data-types/controls-config';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TicketCombo } from '@@core/models/ticket-combo';
import { PickList } from 'primeng/picklist';
import { GGMUtil } from '@@core/utils/ggm-util';
import { TicketService } from '@@core/services/ticket.service';
import { TicketComboService } from '@@core/services/ticket-combo.service';

@Component({
	selector: 'ggm-ticket-combo-detail',
	templateUrl: './ticket-combo-detail.component.html',
	styleUrls: ['./ticket-combo-detail.component.scss'],
})
export class TicketComboDetailComponent implements OnInit {

	private controlsConfig: ControlsConfig = {
		['name']: new FormControl('', Validators.required),
		['price']: new FormControl('', Validators.compose([ Validators.required, Validators.pattern('^[0-9,.]*') ])),
		['codePrefix']: new FormControl('', Validators.required),
		['description']: new FormControl(),
		['isEnabled']: new FormControl(),
		['validFrom']: new FormControl('', Validators.required),
		['validTo']: new FormControl('', Validators.required),
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

	public get validFrom(): AbstractControl {
		return this.userform.get('validFrom');
	}

	public get validTo(): AbstractControl {
		return this.userform.get('validTo');
	}

	public userform: FormGroup;
	private ticketCombo: TicketCombo;
	// private ticketsOfCombo: Ticket[];
	// private ticketList: Ticket[];

	@ViewChild('pickList')
	private pickList: PickList;

	private isMinusClicked: boolean;
	private isPlusClicked: boolean;

	constructor(protected activeRouter: ActivatedRoute,
		protected messageService: MessageService,
		public location: Location,
		protected formBuilder: FormBuilder,
		private ticketService: TicketService,
		private ticketComboService: TicketComboService,
		) {
		this.userform = this.formBuilder.group(this.controlsConfig);

		const id = this.activeRouter.snapshot.paramMap.get('id');
		console.log(`get detail get id = ${id}`);
		if (this.ticketComboService) {
			this.ticketComboService.get(id).subscribe(res => {
				console.log(JSON.stringify(res));
				this.ticketCombo = new TicketCombo(res);
				this.ticketCombo.ticketsList = res['includeTickets'];
				this.pickList.target = (this.ticketCombo.ticketsList) ? this.ticketCombo.ticketsList : [];
				this.name.setValue(res.name);
				this.price.setValue(res.price);
				this.description.setValue(res.description);
				this.codePrefix.setValue(res.codePrefix);
				this.validFrom.setValue(new Date(res.validFrom));
				this.validTo.setValue(new Date(res.validTo));
				this.isEnabled.setValue(res.isEnabled);
			});
		}

		// get tickets from server
		this.ticketService.getEnableTickets().subscribe(ticketList => {
			this.pickList.source = ticketList['data'];
		}, err => {
			console.log(`Can't get list tickets!`);
		});
	}

	public ngOnInit() {
		/**
		 * Override function moveRight of PickList class
		 * to do: copy items from source to target but don't remove items in source list and user can add the same items
		 */
		this.pickList.moveRight = () => {
			console.log('move right');
			if (this.pickList.selectedItemsSource && this.pickList.selectedItemsSource.length) {
				for (let i = 0; i < this.pickList.selectedItemsSource.length; i++) {
					let isAddedTarget = false;
					// if selected ticket from source have in the target ticket list then increase quantity to 1
					if (this.pickList.target && this.pickList.target.length > 0) {
						this.pickList.target.forEach(ticket => {
							if (ticket.id === this.pickList.selectedItemsSource[i].id) {
								ticket.quantity++;
								isAddedTarget = true;
							}
						});
					}

					if (!isAddedTarget) {
						let ticket = this.pickList.selectedItemsSource[i];
						ticket = JSON.parse(JSON.stringify(ticket));
						ticket.quantity = 1;
						this.pickList.target.push(ticket);
					}
					// let selectedItem = this.pickList.selectedItemsSource[i];
					// if (this.pickList.findIndexInList(selectedItem, this.pickList.target) == -1) {
						// this.pickList.target.push(this.pickList.source.splice(this.pickList.findIndexInList(selectedItem, this.pickList.source), 1)[0]);
					// }
				}
				this.pickList.onMoveToTarget.emit({
					items: this.pickList.selectedItemsSource,
				});
				this.pickList.selectedItemsSource = [];
			}
		};

		/**
		 * Override function moveLeft of PickList class
		 * to do: remove items from target list but don't add items in target list to source list
		 */
		this.pickList.moveLeft = () => {
			console.log('move left');
			if (this.pickList.selectedItemsTarget && this.pickList.selectedItemsTarget.length) {
				for (let i = 0; i < this.pickList.selectedItemsTarget.length; i++) {
					let selectedItem = this.pickList.selectedItemsTarget[i];
					if (selectedItem.quantity === 1)
						this.pickList.target.splice(this.pickList.findIndexInList(selectedItem, this.pickList.target), 1);
					else
						selectedItem.quantity--;
					// let selectedItem = this.pickList.selectedItemsTarget[i];
					// if (this.pickList.findIndexInList(selectedItem, this.pickList.source) == -1) {
					// 	this.pickList.source.push(this.pickList.target.splice(this.pickList.findIndexInList(selectedItem, this.pickList.target), 1)[0]);
					// }
				}
				// this.pickList.onMoveToSource.emit({
				// 	items: this.pickList.selectedItemsTarget,
				// });
				this.pickList.selectedItemsTarget = [];
			}
		};

		this.isMinusClicked = this.isPlusClicked = false;
	}

	public onSave(value: object) {
		this.ticketCombo.clone(value);
		this.ticketCombo.price = GGMUtil.changeMoneyToNumber(this.ticketCombo.price.toString());
		this.ticketCombo['includeTickets'] = this.pickList.target.map<object>(ticket => {
			return {id: ticket.id, quantity: ticket.quantity}; // to optimization, we only send to server id and quantity
		});
		console.log(`this.ticketCombo = ${JSON.stringify(this.ticketCombo)}`);

		this.ticketComboService.update(this.ticketCombo).subscribe(res => {
			if (res) {
				console.log('Update ticket success!');
				this.messageService.add({severity: 'success', summary: 'Update Success', detail: 'Ticket Combo submitted'});
				// this.location.back();
			} else {
				this.messageService.add({severity: 'error', summary: 'Update Fail', detail: 'Ticket Combo failed'});
			}
		}, err => {
			console.log('Update ticket fail!');
			this.messageService.add({severity: 'error', summary: 'Update Fail', detail: 'Ticket Combo failed'});
		});
	}

	public transferFormatNumber(): number {
		if (this.userform && this.userform.controls['price']) {
			return GGMUtil.changeMoneyToNumber(this.userform.controls['price'].value);
		}
		else
			return null;
	}

	public onTargetSelect(event: Event) {
		console.log(`onTargetSelect`);
		if (this.isMinusClicked) {
			this.isMinusClicked = false;
			this.pickList.moveLeft();
		}
		if (this.isPlusClicked) {
			this.isPlusClicked = false;
			this.pickList.selectedItemsSource.push(this.pickList.selectedItemsTarget.pop());
			this.pickList.moveRight();
		}
	}

	private descTicketNum() {
		console.log(`Minus button clicked`);
		this.isMinusClicked = true;
	}
	private ascTicketNum() {
		console.log(`Plus button clicked`);
		this.isPlusClicked = true;
	}
}
