import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../role.service';
import { basicAFormFieldsValidator } from '@@shared/directives/form-validation.directive';

@Component({
	selector: 'ggm-roles-create',
	templateUrl: './roles-create.component.html',
	styleUrls: ['./roles-create.component.scss'],
})
export class RolesCreateComponent implements OnInit {

	@ViewChild('firstfield') public firstField: ElementRef;

	public shouldCreateAnother: boolean = false;
	public msgs: Message[] = [];
	public userform: FormGroup;

	constructor(
		private _messageService: MessageService,
		private _formBuilder: FormBuilder,
		private _roleService: RoleService,
		private _router: Router,
	) {
		this.userform = this._formBuilder.group({
			['name']: new FormControl('', Validators.required),
		});
		this.userform.setValidators(basicAFormFieldsValidator(this.userform));
	}

	public ngOnInit() {
		this.firstField.nativeElement.focus();
	}

	get name() { return this.userform.get('name'); }

	public showMessage(msg: Message) {
		this._messageService.add(msg);
	}

	public createRole() {
		this.name.markAsTouched();
		if (this.userform.valid) {
			let role: any = {};
			role['name'] = this.name.value;

			this._roleService.add(role).subscribe(res => {
				if (res) {
					if (this.shouldCreateAnother) {
						const msg: Message = {severity: 'success', summary: 'Role has been created successfully'};
						this.showMessage(msg);
						this.userform.reset();
						this.firstField.nativeElement.focus();
					}
					this._router.navigate(['/accounts/roles/list']);
				}
			});
		}
	}
}
