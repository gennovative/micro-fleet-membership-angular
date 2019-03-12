import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

export function basicAFormFieldsValidator(group: FormGroup): ValidatorFn {
	return (controls = group): ValidationErrors | null => {

		const username = controls.get('username');
		const name = controls.get('name');
		const fullname = controls.get('fullname');
		const password = controls.get('password');
		const confirmPassword = controls.get('confirmPassword');

		if (username) {
			if (username.dirty && !username.value) return {'emptyUsername': true};
			if (username.dirty && username.value.length < 5) return {'shortUsername': true};
			if (username.dirty && username.value.length > 100) return {'longUsername': true};
		}

		if (name) {
			if (name.dirty && !name.value) return {'emptyName': true};
			if (name.dirty && name.value.length < 1) return {'shortName': true};
			if (name.dirty && name.value.length > 100) return {'longName': true};
		}

		if (fullname) {
			if (fullname.dirty && !fullname.value) return {'emptyFullname': true};
			if (fullname.dirty && fullname.value.length < 5) return {'shortFullname': true};
			if (fullname.dirty && fullname.value.length > 50) return {'longFullname': true};
		}

		if (password) {
			if (password.dirty && !password.value) return {'emptyPassword': true};
			if (password.dirty && password.value.length < 6) return {'shortPassword': true};
			if (password.dirty && password.value.length > 128) return {'longPassword': true};
		}

		if (confirmPassword) {
			if (confirmPassword.dirty && !confirmPassword.value && password.value) return {'emptyConfirmPass': true};
			if (confirmPassword.dirty && (confirmPassword.value != password.value) && password.value) return {'invalidConfirmPass': true};
		}

		return null;
	};
}
