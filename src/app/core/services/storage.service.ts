import { Injectable } from '@angular/core';

@Injectable()

export class StorageService {

	constructor() { }

	public setCurrentUser(data: object): void {
		localStorage.setItem('currentUser', JSON.stringify(data));
	}

	public setAccessToken(token: string): void {
		localStorage.setItem('accessToken', token);
	}

	public setRefreshToken(token: string): void {
		localStorage.setItem('refreshToken', token);
	}

	public setRememberSessionStatus(isRemember: number): void {
		localStorage.setItem('rememberStatus', String(isRemember));
	}

	public getCurrentUser(): any {
		return JSON.parse(localStorage.getItem('currentUser'));
	}

	public getCurrentAccessToken(): string {
		return localStorage.getItem('accessToken');
	}

	public getCurrentRefreshToken(): string {
		return localStorage.getItem('refreshToken');
	}

	public getRememberSessionStatus(): boolean {
		return Boolean(Number(localStorage.getItem('rememberStatus')));
	}

	public deleteData(): void {
		localStorage.removeItem('currentUser');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('rememberStatus');
	}
}
