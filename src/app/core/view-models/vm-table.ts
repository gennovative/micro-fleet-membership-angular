import { Table } from 'primeng/table';
import { ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';

import { ColumnTable } from '../../pages/data-types/column-table';
import { TableDataService } from '@@core/data/interfaces/service';

/**
 * VMTable is a class ViewModel of Table in the MVVM pattern
 * for implement, you must have the table id with name "tableContent"
 */
export abstract class VMTable {
	@ViewChild('tableContent') private tableContent: Table;
	@ViewChild('confirmDelete') private confirmDelete: OverlayPanel;

	/**
	 * An array of objects to represent dynamic columns.
	 */
	public abstract cols: ColumnTable[];
	/**
	 * ID field name of the data table
	 */
	protected abstract idField: string;

	/**
	 * @selectedItems to contain the selected items
	 */
	public selectedItems: object[];
	protected datasource: object[];
	/**
	 * @datatable to contain table data
	 */
	public dataTable: object[];
	public loading: boolean;
	public totalRecords: number;
	/**
	 * @showDeleteBtn show delete button
	 */
	public showDeleteBtn: boolean = false;

	/**
	 * @param _dataService is a service that you need to excute CRUD on the table
	 * and your service must implement from the DataService class
	 */
	constructor(
		private _dataService: TableDataService<any>,
		private _confirmationService: ConfirmationService,
	) {
		this.loading = true;
		this.selectedItems = [];
	}

	public delete(id?: number) {
		console.log(`deleteEvents selected ...`);
		if (id === undefined)
			this.deleteArray();
		else
			this.deleteSingle(id);
	}

	private deleteArray() {
		if (this.selectedItems && (this.selectedItems.length > 0)) {
			const selected: any[] = this.selectedItems;
			let idArr: number[] = [];

			selected.forEach(acc => {
				idArr.push(acc.id);
			});

			this._dataService.delete(idArr).subscribe(res => {
				if (res == idArr.length) {
					const deletedDataArray: object[] = [];
					this.dataTable.forEach(entry => {
						const currentEntry: any = entry;
						idArr.forEach(id => {
							if (currentEntry.id === id) deletedDataArray.push(currentEntry);
						});
					});

					if (deletedDataArray.length > 0) {
						deletedDataArray.forEach(acc => {
							this.dataTable.splice(this.dataTable.indexOf(acc), 1);
						});
						this.totalRecords -= this.selectedItems.length;
						this.selectedItems = [];
						this.showDeleteBtn = false;
						this.confirmDelete.hide();
					}
				}
			});
		}
	}

	protected confirmDeleteSingle(id: number) {
		this._confirmationService.confirm({
			message: 'Are you sure you want to delete?',
			accept: () => {
				this.deleteSingle(id);
			},
		});
	}

	protected deleteSingle(id: number) {
		let idArr: number[] = [];
		idArr.push(id);

		this._dataService.delete(idArr).subscribe(res => {
			if (res == idArr.length) {
				this.dataTable.forEach(entry => {
					const currentEntry: any = entry;
					if (currentEntry.id === id) {
						this.dataTable.splice(this.dataTable.indexOf(currentEntry), 1);
						this.totalRecords -= this.selectedItems.length;
						this.selectedItems = [];
						this.showDeleteBtn = false;
						this.confirmDelete.hide();
					}
				});
			}
		});
	}

	public loadDataLazily(event: LazyLoadEvent) {
		console.log('Lazy loading ...');
		this.loading = true;

		let sortField = (event.sortField === undefined) ? 'id' : event.sortField;
		let sortOrder = (event.sortOrder === 1) ? 'asc' : 'desc';
		let pageIndex = (event.first / event.rows) + 1;

		this._dataService.fetchData(pageIndex, event.rows, sortField, sortOrder).subscribe(res => {
			if (res) {
				this.loading = false;
				this.dataTable = res['data'];
				this.totalRecords = res['total'];
			}
		});
	}

	public toggleHandler(event: Event) {
		this.showDeleteBtn = Boolean(this.selectedItems.length != 0);
	}
}
