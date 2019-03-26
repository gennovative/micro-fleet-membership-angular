import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { ApiRequestService } from '@@core/services/api-request.service';
import { TableDataService } from '@@core/data/interfaces/service';
import { TicketCombo } from '@@core/models/ticket-combo';
import { environment } from '../../../environments/environment';

const SERVICE_URL = `${environment.API_URL}combos`;

@Injectable()
export class TicketComboService implements TableDataService<TicketCombo> {

	constructor(private _apiRequestService: ApiRequestService,
		private _httpClient: HttpClient,
	) {
	}

	public add(ticketCombo: TicketCombo): Observable<TicketCombo> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.post(SERVICE_URL, { model: ticketCombo }, { headers })
		.pipe(
			map(res => {
				return res ? <TicketCombo>res : null;
			}),
		);
	}

	public get(id: string): Observable<TicketCombo> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(`${SERVICE_URL}/${id}`, {headers})
		.pipe(
			map(res => {
				return res ? <TicketCombo>res : null;
			}),
		);
	}

	public fetchData(pageIndex: number, pageSize: number, sortBy: string, sortType: string): Observable<TicketCombo[]> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(`${SERVICE_URL}/page/${pageIndex}/${pageSize}/${sortBy}/${sortType}`, {headers})
		.pipe(
			map(res => {
				return res ? <TicketCombo[]>res : null;
			}),
		);
	}

	public delete(idArray: number[]): Observable<number> {
		const headers = this._apiRequestService.appendAccessToken();

		const queryString = idArray.map(val => {
			return 'id=' + encodeURIComponent(String(val));
		}).join('&');

		return this._httpClient.delete(`${SERVICE_URL}/hard?${queryString}`, {headers})
		.pipe(
			map(res => {
				return res ? Number(res) : null;
			}),
		);
	}

	public update(ticketCombo: TicketCombo): Observable<TicketCombo> {
		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.patch(SERVICE_URL, {model: ticketCombo}, {headers})
		.pipe(
			map(data => {
				return data ? <TicketCombo>data : null;
			}),
		);
	}

	public searchGlobal(keyword: string): Observable<TicketCombo[]> {
		return null;
	}

	public sort(sortField: string, sortOrder: number): Observable<TicketCombo[]> {
		return null;
	}
}
