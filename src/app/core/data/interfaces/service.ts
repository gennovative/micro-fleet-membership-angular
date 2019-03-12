import { Observable } from 'rxjs/Observable';

export interface TableDataService<T> {

	/**
	 * search all data fields
	 * @param keyword : words of user input to search in the data
	 */
	searchGlobal(keyword: string): Observable<T[]>;

	/**
	 * Get a data element by id
	 * @param  id is a ID of a data table
	 */
	get(id: string): Observable<T>;

	/**
	 *
	 * @param  pageIndex Page's index
	 * @param pageSize Number of items per page
	 * @param sortBy Label to sort by
	 * @param sortType Sorting type (ascending or descending)
	 */
	fetchData(pageIndex: number, pageSize: number, sortBy: string, sortType: string): Observable<T[]>;

	add(data: T): Observable<T>;
	update(data: T): Observable<T>;
	delete(idList: number[]): Observable<number>;
}
