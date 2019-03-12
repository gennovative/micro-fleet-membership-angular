import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Role } from './models/role';

import { TableDataService } from '../../core/data/interfaces/service';
import { ApiRequestService } from '../../core/services/api-request.service';

@Injectable()
export class RoleService implements TableDataService<Role> {
	constructor(
		private _apiRequestService: ApiRequestService,

		private _httpClient: HttpClient,
	) { }

	public add(role: Role): Observable<Role> {
		const {id, name} = role;

		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.post(
			`${environment.API_URL}roles/`,
			{ model: { id, name } },
			{ headers },
		).pipe(
			map(res => {
				if (res) {
					const roleRes: any = res;
					return {id: roleRes.id, name: roleRes.name};
				}
				return null;
			}),
		);
	}

	public get(id: string): Observable<Role> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(
			`${environment.API_URL}roles/${id}`,
			{ headers },
		).pipe(
			map(res => {
				if (res) {
					const role: any = res;
					return { id: role.id, name: role.name };
				}
				return null;
			}),
		);
	}

	public fetchData(pageIndex: number, pageSize: number, sortBy: string, sortType: string): Observable<Role[]> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(
			`${environment.API_URL}roles/page/${pageIndex}/${pageSize}/${sortBy}/${sortType}`,
			{ headers },
		).pipe(
			map(res => {
				if (res) {
					const response: any = res;
					return response;
				}
				return null;
			}),
		);
	}

	public delete(idArray: number[]): Observable<number> {
		return this.deleteSingle(idArray[0]);
	}

	public deleteSingle(id: number): Observable<number> {
		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.delete(
			`${environment.API_URL}roles/hard/${id}`,
			{ headers },
		).pipe(
			map(res => {
				if (res) {
					return Number(res);
				}
				return null;
			}),
		);
	}

	public update(role: Role): Observable<Role> {
		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.patch(
			`${environment.API_URL}roles/`,
			{ model: role },
			{ headers },
		).pipe(
			map(data => {
				if (data) {
					const res: any = data;
					return res;
				}
				return null;
			}),
		);
	}

	public searchGlobal(keyword: string): Observable<Role[]> {
		return null;
	}
}
