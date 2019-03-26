import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { ApiRequestService } from '@@core/services/api-request.service';
import { environment } from '../../../environments/environment';
import { TableDataService } from '@@core/data/interfaces/service';
import { Ticket } from '@@core/models/ticket';

const SERVICE_URL = `${environment.API_URL}tickets`;

@Injectable()
export class TicketService implements TableDataService<Ticket> {

	constructor(private _apiRequestService: ApiRequestService,
		private _httpClient: HttpClient,
	) {
	}

	public add(ticket: Ticket): Observable<Ticket> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.post(
			SERVICE_URL,
			{
				model: ticket,
			},
			{ headers },
		).pipe(map((res: any) => {
			if (res) {
				return <Ticket>res;
			}
			return null;
		}));
	}

	public get(id: string): Observable<Ticket> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(
			`${SERVICE_URL}/${id}`,
			{ headers },
		).pipe(
			map(res => {
				if (res) {
					return <Ticket>res;
				}
				return null;
			}),
		);
	}

	// get all enable tickets
	public getEnableTickets(): Observable<Ticket[]> {
		return this.fetchData(1, 50, 'id', 'asc');
	}

	public fetchData(pageIndex: number, pageSize: number, sortBy: string, sortType: string): Observable<Ticket[]> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(
			`${SERVICE_URL}/page/${pageIndex}/${pageSize}/${sortBy}/${sortType}`,
			{headers},
		).pipe(
			map(res => {
				if (res) {
					return <Ticket[]>res;
				}
				return null;
			}),
		);
	}

	public delete(idArray: number[]): Observable<number> {
		const headers = this._apiRequestService.appendAccessToken();

		const queryString = idArray.map(val => {
			return 'id=' + encodeURIComponent(String(val));
		}).join('&');

		return this._httpClient.delete(`${SERVICE_URL}/${queryString}`, {headers})
		.pipe(
			map(res => {
				if (res) {
					return Number(res);
				}
				return null;
			}),
		);
	}

	public update(ticket: Ticket): Observable<Ticket> {
		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.patch(SERVICE_URL, {model: ticket}, {headers})
		.pipe(
			map(data => {
				if (data) {
					const res: any = data;
					return res;
				}
				return null;
			}),
		);
	}

	public searchGlobal(keyword: string): Observable<Ticket[]> {
		return null;
	}

	public sort(sortField: string, sortOrder: number): Observable<Ticket[]> {
		return null;
	}
}
