import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { ReportService } from '../report.service';
import { ApiRequestService } from '@@core/services/api-request.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { TIME_UNITS } from '../../../data-types/ggm-types';

const SERVICE_URL = `${environment.API_URL}checkin_entries`;

@Injectable()
export class VisitorExperienceService implements ReportService {
	constructor(
		private apiRequestService: ApiRequestService,
		private httpClient: HttpClient,
	) { }

	public getMinYear(): Observable<Date> {
		const headers = this.apiRequestService.appendAccessToken();
		return this.httpClient.get(`${SERVICE_URL}/min-year`, { headers })
			.pipe(map((res: any) => res.data as Date));
	}

	public fetchLineChartVisitor(dateFrom: Date, dateTo: Date, timeUnit: TIME_UNITS): Observable<any> {
		const headers = this.apiRequestService.appendAccessToken();
		let body = {
			model: {
				dateFrom,
				dateTo,
				timeUnit,
			},
		};

		return this.httpClient.post(`${SERVICE_URL}/get-visitors-time`, body, { headers })
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

	// public fetchPieChartVisitor(dateFrom: Date, dateTo: Date): Observable<any> {
	// 	const headers = this.apiRequestService.appendAccessToken();
	// 	let body = {
	// 		model: {
	// 			dateFrom,
	// 			dateTo,
	// 		},
	// 	};

	// 	return this.httpClient.post(`${SERVICE_URL}/get-visitors-pie-chart`, body, { headers })
	// 		.pipe(
	// 			map((res: any) => {
	// 				const result = res.reduce((a: any, el: any) => {
	// 					a.quantity.push(el.value);
	// 					a.visitorName.push(el.name);
	// 					return a;
	// 				}, {
	// 					quantity: [],
	// 					visitorName: [],
	// 				});
	// 				return result;
	// 			}),
	// 		);
	// }
}
