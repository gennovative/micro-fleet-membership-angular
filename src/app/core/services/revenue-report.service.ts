import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { ApiRequestService } from '@@core/services/api-request.service';
import { environment } from '../../../environments/environment';
import { ReportService } from './report.service';
import { TIME_UNITS } from '../../pages/data-types/ggm-types';

const SERVICE_URL = `${environment.API_URL}ticket-orders`;

@Injectable()
export class RevenueReportService implements ReportService {

	constructor(private apiRequestService: ApiRequestService,
		private httpClient: HttpClient,
	) { }

	public getMinYear(): Observable<Date> {
		const headers = this.apiRequestService.appendAccessToken();
		return this.httpClient.get(`${SERVICE_URL}/min-year`, { headers })
			.pipe(map((res: any) => res.data as Date));
	}

	public fetchLineChartRevenue(dateFrom: Date, dateTo: Date, timeUnit: TIME_UNITS): Observable<any> {
		const headers = this.apiRequestService.appendAccessToken();
		let body = {
			model: {
				dateFrom,
				dateTo,
				timeUnit,
			},
		};

		return this.httpClient.post(`${SERVICE_URL}/get-revenue-tickets-line-chart`, body, { headers })
		.pipe(map((res: any) => {
			const result = {};
			res.forEach((element: any) => {
				const dateStr = new Date(element.timePurchased).toDateString();
				if (!result[element.name])
					result[element.name] = {[dateStr]: element.value};
				else
					result[element.name][dateStr] = element.value;
			});

			return result;
		}));
	}

	public fetchPieChartRevenue(dateFrom: Date, dateTo: Date): Observable<any> {
		const headers = this.apiRequestService.appendAccessToken();
		let body = {
			model: {
				dateFrom,
				dateTo,
			},
		};

		return this.httpClient.post(`${SERVICE_URL}/get-revenue-tickets-pie-chart`, body, { headers })
			.pipe(
				map((res: any) => {
					const result = res.reduce((a: any, el: any) => {
						a.revenue.push(el.value);
						a.ticketName.push(el.name);
						return a;
					}, {
						revenue: [],
						ticketName: [],
					});
					return result;
				}),
			);
	}
}
