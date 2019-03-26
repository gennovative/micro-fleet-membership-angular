import { Event } from '@@core/models/event';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TableDataService } from '@@core/data/interfaces/service';

@Injectable()
export class EventService implements TableDataService<Event> {

	private ELEMENT_DATA: Event[] = [
		{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
		{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
		{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
		{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
		{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
		{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
		{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
		{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
		{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},

		{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
		{position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
		{position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
		{position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
		{position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
		{position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
		{position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
		{position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
		{position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
		{position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
		{position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},

		{position: 21, name: 'Scandium', weight: 1.0079, symbol: 'Sc'},
		{position: 22, name: 'Titanium', weight: 4.0026, symbol: 'Ti'},
		{position: 23, name: 'Vanadium', weight: 6.941, symbol: 'V'},
		{position: 24, name: 'Chromium', weight: 9.0122, symbol: 'Cr'},
		{position: 25, name: 'Manganese', weight: 10.811, symbol: 'Mn'},
		{position: 26, name: 'Iron', weight: 12.0107, symbol: 'Fe'},
		{position: 27, name: 'Cobalt', weight: 14.0067, symbol: 'Co'},
		{position: 28, name: 'Nickel', weight: 15.9994, symbol: 'Ni'},
		{position: 29, name: 'Copper', weight: 18.9984, symbol: 'Cu'},
		{position: 30, name: 'Zinc', weight: 20.1797, symbol: 'Zn'},

		{position: 31, name: 'Gallium', weight: 22.9897, symbol: 'Ga'},
		{position: 32, name: 'Germanium', weight: 24.305, symbol: 'Ge'},
		{position: 33, name: 'Arsenic', weight: 26.9815, symbol: 'As'},
		{position: 34, name: 'Selenium', weight: 28.0855, symbol: 'Se'},
		{position: 35, name: 'Bromine', weight: 30.9738, symbol: 'Br'},
		{position: 36, name: 'Krypton', weight: 32.065, symbol: 'Kr'},
		{position: 37, name: 'Rubidium', weight: 35.453, symbol: 'Rb'},
		{position: 38, name: 'Strontium', weight: 39.948, symbol: 'Sr'},
		{position: 39, name: 'Yttrium', weight: 39.0983, symbol: 'Y'},
		{position: 40, name: 'Zirconium', weight: 40.078, symbol: 'Zr'},
	];
	// constructor(private http: HttpClient) { }
	constructor() {
	}

	public add(event: Event): Observable<Event> {
		// return new Observable((resolve, reject) => {
		// 	event.position = this.ELEMENT_DATA.length + 1; // auto generate id
		// 	this.ELEMENT_DATA.unshift(event);
		// 	// this.ELEMENT_DATA.push(event); // this line for emulator the http post to require add new event on the server
		// 	of(true) // emulator for the client get the response from server
		// 	.subscribe(res => {
		// 		resolve(res);
		// 	}, err => {
		// 		reject(err);
		// 	});
		// });

		return null;
	}

	public get(id: string): Observable<Event> {
		// return new Observable(resolve => {
		// 	let event = this.ELEMENT_DATA.find(_element => {
		// 		return _element.position === id;
		// 	});

		// 	of(event).subscribe(data => {
		// 		// resolve(data); // for use real data on server
		// 		resolve({...data}); // for use virtual data on client
		// 	}, err => {
		// 		console.error(err);
		// 	});
		// });
		return null;
	}

	public getAll(): Observable<Event[]> {
		// return new Promise(resolve => {
		// 	of(this.ELEMENT_DATA).subscribe(data => {
		// 		// resolve(data); // for use real data on server
		// 		resolve([...data]); // for use virtual data on client
		// 	}, err => {
		// 		console.error(err);
		// 	});
		// });
		return null;
	}

	public fetchData(pageIndex: number, pageSize: number, sortBy: string, sortType: string): Observable<Event[]> {
		// return new Promise(resolve => {
		// 	let dataReturn = this.ELEMENT_DATA.slice(start, end);
		// 	of(dataReturn).subscribe(data => {
		// 		resolve([...data]);
		// 	}, err => {
		// 		console.error(err);
		// 	});
		// });
		return null;
	}

	public delete(eventList: number[]): Observable<number> {
		// return new Promise(resolve => {
		// 	eventList.forEach(element => {
		// 		this.ELEMENT_DATA.splice(this.ELEMENT_DATA.indexOf(<Event>element), 1);
		// 	});
		// 	of(true).subscribe(data => {
		// 		resolve(data);
		// 	}, err => {
		// 		console.error(err);
		// 	});
		// });
		return null;
	}

	public update(event: Event): Observable<Event> {
		// return new Promise((resolve, reject) => {
		// 	let mElement = this.ELEMENT_DATA.find(_element => {
		// 		return _element.position === event.position;
		// 	});
		// 	mElement.name = event.name;
		// 	mElement.symbol = event.symbol;
		// 	mElement.weight = event.weight;

		// 	// return state update success/fail = true/false
		// 	of(true).subscribe(data => {
		// 		resolve(data);
		// 	}, err => {
		// 		console.error(err);
		// 		reject(err);
		// 	});
		// });
		return null;
	}

	public searchGlobal(keyword: string): Observable<Event[]> {
		// return new Promise((resolve, reject) => {
		// 	let result: Event[] = [];
		// 	this.ELEMENT_DATA.forEach(element => {
		// 		if (element.name.includes(keyword)
		// 			|| element.position.toString().includes(keyword)
		// 			|| element.symbol.includes(keyword)
		// 			|| element.weight.toString().includes(keyword)) {
		// 				result.push(element);
		// 			}
		// 	});

		// 	of(result).subscribe(data => {
		// 		resolve(data);
		// 	}, err => {
		// 		console.error(err);
		// 		reject(err);
		// 	});
		// });
		return null;
	}

	public sort(sortField: string, sortOrder: number): Observable<Event[]> {
		// return new Promise((resolve, reject) => {
		// 	let result = this.ELEMENT_DATA.sort((a, b) => {
		// 		return sortOrder * (a[sortField] > b[sortField] ? 1 : -1);
		// 	});

		// 	of(result).subscribe(data => {
		// 		resolve(data);
		// 	}, err => {
		// 		console.log(err);
		// 		reject(err);
		// 	});
		// });
		return null;
	}
}
