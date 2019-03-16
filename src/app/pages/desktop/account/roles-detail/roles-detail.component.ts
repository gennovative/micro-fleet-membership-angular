import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MessageService, Message } from 'primeng/api';

import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../role.service';
import { basicAFormFieldsValidator } from '@@shared/directives/form-validation.directive';

@Component({
	selector: 'ggm-roles-detail',
	templateUrl: './roles-detail.component.html',
	styleUrls: ['./roles-detail.component.scss'],
})
export class RolesDetailComponent implements OnInit, AfterViewInit {

	@ViewChild('firstfield') public firstField: ElementRef;

	public userform: FormGroup;
	private _id: string;
	public formReady: boolean = false;

	constructor(
		private _activeRouter: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _messageService: MessageService,
		private _roleService: RoleService,
		private _route: ActivatedRoute,
	) { }

	public ngOnInit() {
		this._id = this._activeRouter.snapshot.paramMap.get('id');

		this._route.data.subscribe(res => {
			if (res) {
				const data: any = res[0];
				this.userform = this._formBuilder.group(
					{
						['name']: new FormControl(data.name),
					},
				);
				this.userform.setValidators(basicAFormFieldsValidator(this.userform));
				this.formReady = true;
			}
		});
	}

	public ngAfterViewInit() {
		this.firstField.nativeElement.focus();
	}

	get name() { return this.userform.get('name'); }

	public showMessage(msg: Message) {
		this._messageService.add(msg);
	}

	public onSave() {
		if (this.userform.valid && this.userform.dirty) {
			let data: any = {};
			data['name'] = this.name.value;
			data['id'] = this._id;
			this._roleService.update(data).subscribe(res => {
				if (res) {
					const msg: Message = {severity: 'success', summary: 'Role has been successfully updated'};
					this.showMessage(msg);
				}
			});
		}
	}
}
