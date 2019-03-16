import {AbstractControl, ValidationErrors} from '@angular/forms';

export class PasswordValidation {
	public static MatchPassword(abstractControl: AbstractControl): ValidationErrors | null {
		let password = abstractControl.get('password');
		let confirmPassword = abstractControl.get('confirmPassword');
		if (password && confirmPassword) {
			if (password.value != confirmPassword.value) { // to get value in input tag
				confirmPassword.markAsDirty({onlySelf: true});
				confirmPassword.setErrors( {MatchPassword: true} );
				return {'valid': false, 'dirty': true};
			}
			else {
				confirmPassword.markAsDirty({onlySelf: false});
			}
		}

		return null;
	}
}
