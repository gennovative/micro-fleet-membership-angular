import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SelectItem, Message, MessageService } from 'primeng/api';

import { AccountService } from '../account.service';
import { basicAFormFieldsValidator } from '@@shared/directives/form-validation.directive';

@Component({
	selector: 'ggm-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit {

	@ViewChild('firstfield') public firstField: ElementRef;

	public userform: FormGroup;
	private roleItems: SelectItem[] = [];
	public msgs: Message[] = [];
	private _id: string;
	public formReady: boolean = false;
	public userRole: SelectItem = {label: 'admin', value: ''};

	constructor(
		private _accountService: AccountService,
		private _formBuilder: FormBuilder,
		private _messageService: MessageService,
		private _route: ActivatedRoute,
	) { }

	public ngOnInit() {
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
						['role']: new FormControl(this.userRole, Validators.required),
					},
				);
				this.userform.setValidators(basicAFormFieldsValidator(this.userform)),
				this.formReady = true;
			}
		});

		// this._route.data.pipe(
		// 	concatMap(resolveRes => {
		// 		if (resolveRes) {
		// 			return this._accountService.getRoles().pipe(
		// 				concatMap(roleRes => {
		// 					if (roleRes) {
		// 						return of({resolveRes, roleRes});
		// 					}
		// 					return null;
		// 				}),
		// 			);
		// 		}
		// 		return null;
		// 	}),
		// ).subscribe(res => {
		// 	if (res) {
		// 		const resolveData: any = res.resolveRes[0];
		// 		res.roleRes.forEach(role => {
		// 			this.roleItems.push({
		// 				label: role.name,
		// 				value: role.id,
		// 			});
		// 		});

		// 		this.userRole = this.roleItems.find(item => {
		// 			return item.label === resolveData.role;
		// 		});

		// 		this.userform = this._formBuilder.group(
		// 			{
		// 				['username']: new FormControl(resolveData.username),
		// 				['fullname']: new FormControl(''),
		// 				['password']: new FormControl(''),
		// 				['confirmPassword']: new FormControl(''),
		// 				['role']: new FormControl(this.userRole, Validators.required),
		// 			},
		// 		);
		// 		this.userform.setValidators(basicAccountFormValidator(this.userform)),
		// 		this.formReady = true;
		// 	}
		// });
	}

	get username() { return this.userform.get('username'); }
	get password() { return this.userform.get('password'); }
	get role() { return this.userform.get('role'); }

	public ngAfterViewInit() {
		console.dir(this.roleItems);
		this.role.setValue(this.userRole);
		this.firstField.nativeElement.focus();
	}

	public showMessage(msg: Message) {
		this._messageService.add(msg);
	}

	public onSave() {
		this.role.markAsDirty();
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
					const msg: Message = { severity: 'success', summary: 'Profile has been successfully updated' };
					this.showMessage(msg);
				}
			});
		}

	}
}
