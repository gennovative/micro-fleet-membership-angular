import { Observable } from 'rxjs/Observable';

export interface ReportService {
	getMinYear(): Observable<Date>;
}
