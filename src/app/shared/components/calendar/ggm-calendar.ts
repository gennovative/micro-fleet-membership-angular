import { Calendar } from 'primeng/calendar';
import { Component, forwardRef, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { DomHandler } from 'primeng/api';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const CALENDAR_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => GgmCalendarComponent),
	multi: true,
};

@Component({
	selector: 'ggm-calendar',
	template: `<p-calendar #_context (onYearChange)='onYearSelected($event)'
			(onFocus)='onFocusCalendar($event)'></p-calendar>`,
	providers: [DomHandler, CALENDAR_VALUE_ACCESSOR],
})
export class GgmCalendarComponent extends Calendar implements OnInit, AfterViewChecked {

	@ViewChild('_context') private _context: Calendar;

	public minDate: Date = new Date(1990, 0, 1);
	public maxDate: Date = new Date();

	public ngOnInit() {
		super.ngOnInit();
		this._context.onSelect = this.onSelect;
	}

	public ngAfterViewChecked(): void {
		const datepickerNextBtn = document.getElementsByClassName('ui-datepicker-next');
		const datepickerPrevBtn = document.getElementsByClassName('ui-datepicker-prev');
		if (!!datepickerNextBtn && !!datepickerPrevBtn && this.context.overlayVisible) { // only work when this calendar showing overlay
			for (let index = 0; index < datepickerNextBtn.length; index++) {
				// invisible datepicker prev button
				if (this.context.currentMonth <= this.context.minDate.getMonth() && this.context.currentYear === this.context.minDate.getFullYear()) {
					datepickerPrevBtn[index].setAttribute('style', 'visibility: hidden');
				} else {
					datepickerPrevBtn[index].setAttribute('style', 'visibility: visible');
				}

				// invisible datepicker next button
				if (this.context.currentMonth >= this.context.maxDate.getMonth() && this.context.currentYear === this.context.maxDate.getFullYear()) {
					datepickerNextBtn[index].setAttribute('style', 'visibility: hidden');
				} else {
					datepickerNextBtn[index].setAttribute('style', 'visibility: visible');
				}
			}
		}

		if (this.context.view === 'month') {
			if (this.context.overlayVisible) { // only work when this calendar showing overlay
				const monthpickers = document.getElementsByClassName('ui-monthpicker');
				for (let i = 0; i < 12; i++) { // 12 months
					for (let j = 0; j < monthpickers.length; j++) { // maybe have 1-2 month picker, for sure we will set all month picker
						const monthpicker = monthpickers[j];
						const element = monthpicker.children.item(i); // HTML element of month

						if (!!element) {
							element.setAttribute('style', 'visibility: visible');
							if ( // show limit month buttons on the view for prevent wrong input from user
								(this.context.currentYear === this.context.minDate.getFullYear() && this.context.minDate.getMonth() > i) ||
								(this.context.currentYear === this.context.maxDate.getFullYear() && this.context.maxDate.getMonth() < i)
							) {
								element.setAttribute('style', 'visibility: hidden');
							}
						}
					}
				}
			}
		}
	}

	public switchToDailyView() {
		this.view = 'date';
		this._context.view = 'date';
		this._context.dateFormat = 'dd/mm/yy';
		this._context.monthNavigator = true;
		this._context.yearNavigator = true;
		this._context.populateYearOptions(this.minDate.getFullYear(), this.maxDate.getFullYear());
		this._context.minDate = this.minDate;
		this._context.maxDate = this.maxDate;
		this._context.updateInputfield();
	}
	public switchToMonthlyView() {
		this.view = 'month';
		this._context.view = 'month';
		this._context.dateFormat = 'mm/yy';
		this._context.monthNavigator = false;
		this._context.yearNavigator = true;
		this._context.populateYearOptions(this.minDate.getFullYear(), this.maxDate.getFullYear());
		this._context.createMonthPickerValues();
		this._context.minDate = this.minDate;
		this._context.maxDate = this.maxDate;
		this._context.updateInputfield();
	}
	public switchToYearlyView() {
		// Calendar component dont have show only year. This code cheat for show only year picker
		this.view = 'year';
		this._context.view = 'month';
		this._context.dateFormat = 'yy';
		this._context.monthNavigator = true;
		this._context.yearNavigator = true;
		this._context.populateYearOptions(this.minDate.getFullYear(), this.maxDate.getFullYear());
		this._context.monthPickerValues = [];
		this._context.minDate = this.minDate;
		this._context.maxDate = this.maxDate;
		this._context.updateInputfield();
	}

	public onYearSelected(event: any) {
		if (this.view === 'year') {
			this.context.writeValue(new Date(this.context.currentYear, 0, 1));
			this.context.updateInputfield();
			this.onSelect.emit(this.context.value);
		}
	}

	public get context() {
		return this._context;
	}

	public getValue(): any {
		return this._context.value;
	}

	public showOverlay() {
		this.updateUI();
		this.overlayVisible = true;
	}

	public onFocusCalendar(event: any) {
		if (this.view === 'year') {
			this.context.writeValue(new Date(this.context.currentYear, 0, 1));
			this.context.updateInputfield();
			this.onSelect.emit(this.context.value);
		}
	}
}
