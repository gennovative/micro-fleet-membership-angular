import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService, Message } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { basicAFormFieldsValidator } from '@@shared/directives/form-validation.directive';
import { AccountService } from '@@core/services/account.service';

@Component({
	selector: 'ggm-account-detail',
	templateUrl: './account-detail.component.html',
	styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent implements OnInit, AfterViewInit {

	@ViewChild('firstfield') public firstField: ElementRef;

	public userform: FormGroup;
	private roleItems: SelectItem[] = [];
	public msgs: Message[] = [];
	private _id: string;
	public formReady: boolean = false;

	constructor(
		private _accountService: AccountService,
		private _activeRouter: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _location: Location,
		private _messageService: MessageService,
		private _route: ActivatedRoute,
	) { }

	public ngOnInit() {
		this._id = this._activeRouter.snapshot.paramMap.get('id');
		this._accountService.getRoles().subscribe(res => {
			if (res) {
				res.forEach(role => {
					let selectItem: SelectItem = {label: '', value: ''};
					selectItem.label = role.name;
					selectItem.value = role.id;
					this.roleItems.push(selectItem);
				});
			}
		});

		this._route.data.subscribe(res => {
			if (res) {
				const data: any = res[0];
				this.userform = this._formBuilder.group(
					{
						['username']: new FormControl(data.username),
						['fullname']: new FormControl(''),
						['password']: new FormControl(''),
						['confirmPassword']: new FormControl(''),
						['role']: new FormControl('', Validators.required),
					},
				);
				this.userform.setValidators(basicAFormFieldsValidator(this.userform)),
				this.formReady = true;
			}
		});
	}

	public ngAfterViewInit() {
		this.firstField.nativeElement.focus();
	}

	get username() { return this.userform.get('username'); }
	get password() { return this.userform.get('password'); }
	get role() { return this.userform.get('role'); }

	public showMessage(msg: Message) {
		this._messageService.add(msg);
	}

	public onSave() {
		this.userform.markAsDirty();
		if (this.userform.valid) {
			let data: any = {};
			data['roleId'] = this.role.value;
			data['id'] = this._id;
			if (this.username.dirty) data['username'] = this.username.value;
			if (this.password.value) {
				data['password'] = this.password.value;
			}

			this._accountService.update(data).subscribe(res => {
				if (res) {
					const msg: Message = {severity: 'success', summary: 'Account has been successfully updated'};
					this.showMessage(msg);
				}
			});
		}

	}
}
