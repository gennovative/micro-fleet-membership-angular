import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AuthData } from '../models/authData';
import { StorageService } from '@@core/services/storage.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../src/environments/environment';

@Component({
	selector: 'ggm-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit, OnDestroy {

	@ViewChild('firstfield') protected firstField: ElementRef;

	public loginForm: FormGroup;

	public rememberSession: boolean = false;

	private _usernameMsg: string;
	private _passwordMsg: string;
	public backendErrorExists: boolean = false;

	constructor(
		private _authService: AuthService,
		private _formBuilder: FormBuilder,
		private _messageService: MessageService,
		private _router: Router,
		private _storageService: StorageService,
	) { }

	public ngOnInit() {
		document.body.classList.add('ggm-login');
		this.loginForm = this._formBuilder.group({
			username: new FormControl('', [
				Validators.required,
				Validators.minLength(0),
				Validators.maxLength(30),
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(128),
			]),
		});
		this.firstField.nativeElement.focus();
	}

	public ngOnDestroy() {
		document.body.classList.remove('ggm-login');
	}

	get username() { return this.loginForm.get('username'); }
	get password() { return this.loginForm.get('password'); }

	public onKeyUp(): void {
		if (this.username.errors && this.username.dirty) {
			let errors = this.username.errors;
			if (errors.required) {
				this._usernameMsg = 'Username is not allowed to be empty';
			}
			else if (errors.minlength) {
				this._usernameMsg = 'Username too short';
			}
			else if (errors.maxlength) {
				this._usernameMsg = 'Username too long';
			}
		}
		else {
			this._usernameMsg = null;
		}

		if (this.password.errors && this.password.dirty) {
			let errors = this.password.errors;
			if (errors.required) {
				this._passwordMsg = 'Password is not allowed to be empty';
			}
			else if (errors.minlength) {
				this._passwordMsg = 'Password too short';
			}
			else if (errors.maxlength) {
				this._passwordMsg = 'Password too long';
			}
		}
	}

	public onSubmit(): void {
		this.username.markAsDirty();
		this.password.markAsDirty();
		if (this.loginForm.valid) {
			const authData: AuthData = {
				model: {
					username: this.username.value,
					password: this.password.value,
				},
			};

			this._messageService.messageObserver.subscribe(res => {
				const currentPath = this._router.routerState.snapshot.url.replace(environment.API_URL, '');
				const responseMsg: any = res;
				if (currentPath === responseMsg.path || `${currentPath}/login` === responseMsg.path) {
					const prettyMsg: string = responseMsg.data.replace(/"/g, '');
					if (responseMsg.fieldName === 'username') {
						!this._usernameMsg ? this._usernameMsg = prettyMsg[0].toUpperCase() + prettyMsg.substring(1) : null;
					}
					else if (responseMsg.fieldName === 'password') {
						!this._passwordMsg ? this._passwordMsg = prettyMsg[0].toUpperCase() + prettyMsg.substring(1) : null;
					}
					else {
						this.backendErrorExists = true;
					}
				}
			});

			this._authService.authenticate(authData).subscribe(res => {
				if (res) {
					this._storageService.setCurrentUser({id: res.id, username: res.username, role: res.role});
					this._storageService.setAccessToken(res.token);
					this._storageService.setRefreshToken(res.refreshToken);
					this._storageService.setRememberSessionStatus(this.rememberSession ? 1 : 0);
					this._router.navigate(['']);
				}
			});
		}
	}
}
