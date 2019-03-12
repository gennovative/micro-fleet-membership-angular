import { ViewChild, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { UIChart } from 'primeng/chart';
import { GgmCalendarComponent } from '../view-models/ggm-calendar';
import { ReportService } from '../report.service';
import { DataChart, DataChartType, TIME_UNITS, CHART_TYPES, ChartTypeSelectButton } from '../../data-types/ggm-types';
import { TitleCasePipe } from '@angular/common';
import { Calendar } from 'primeng/calendar';

/*
1. Chart xem thống kê về tiền:
	- Trong 1 khoảng thời gian, xem tổng doanh thu theo từng loại vé. --> pie chart
	- Trong 1 khoảng thời gian, xem tổng doanh thu theo từng đơn vị thời gian (ngày, tháng, năm) -> line chart

2. Chart xem thống kê về số lượng vé:
	- Trong 1 khoảng thời gian, xem tổng số lượng vé của từng loại bán ra là bao nhiêu. --> pie chart
	- Trong 1 khoảng thời gian, xem tổng số lượng vé của từng loại bán ra theo từng đơn vị thời gian (ngày, tháng, năm). --> line chart
*/

/**
 * @todo Implement data display properly according to from and to
 */
export abstract class ReportComponent implements OnInit {

	@ViewChild('chart')
	private chart: UIChart;
	@ViewChild('dateFrom')
	protected dateFrom: GgmCalendarComponent;
	@ViewChild('dateTo')
	protected dateTo: GgmCalendarComponent;

	public data: DataChart = <DataChart>{};
	protected dataSets: DataChartType[] = [];
	public _timeUnits: object[];
	public reportName: string;

	private _dateFromContext: Calendar;
	private _dateToContext: Calendar;

	public _currentChartType: CHART_TYPES;

	public chartTypesVisibility: string = 'visible';
	public timeUnitsVisibility: string = 'visible';

	private _currentDateFrom: Date;
	private _currentDateTo: Date;

	public chartTypesForSelectButton: ChartTypeSelectButton[];
	protected dataChartLabels: string[];
	public selectedTimeUnit: TIME_UNITS;

	protected numberOfDataPoints: number;
	public unitName: string = '';

	constructor(
		protected _messageService: MessageService,
		protected _reportService: ReportService,
	) {}

	// -------- INIT SECTION --------------
	public ngOnInit() {
		// Must be to initialize in order: chart types -> time units -> calendar
		this._dateFromContext = this.dateFrom.context;
		this._dateToContext = this.dateTo.context;
		this.selectedTimeUnit = TIME_UNITS.DAY;
		this.initSelectChartTypes();
		this.initSelectTimeUnitComponent();
		this.initCalendars();

		this.initChart();
		this.fetchData();
		this.updateChart();
	}

	private initSelectChartTypes() {
		const titlePipe: TitleCasePipe = new TitleCasePipe();
		this._currentChartType = this.chartTypesForSelectButton[0].value; // default chart type
		if (this.chartTypesForSelectButton.length >= 2) {
			this.chartTypesForSelectButton.forEach(type => {
				type.label = titlePipe.transform(type.value);
			});
		}
		else this.chartTypesVisibility = 'hidden';
	}

	private initSelectTimeUnitComponent() {
		this.selectedTimeUnit = TIME_UNITS.DAY; // default value time unit

		// ngModel of timeUnits select buttons
		this._timeUnits = [
			{label: '1D', value: TIME_UNITS.DAY},
			{label: '1M', value: TIME_UNITS.MONTH},
			{label: '1Y', value: TIME_UNITS.YEAR},
		];

		// Pie chart doesn't have time units
		this.hideTimeUnitsComponent();
	}

	private initCalendars() {
		// Get min year value in DB to set year range for the calendar components
		this._reportService.getMinYear().subscribe(value => {
			this.dateFrom.minDate = this.dateTo.minDate = new Date(value);
			// Set calendar view according to the value of time unit
			this.changeCalendarView(this.selectedTimeUnit);
		}, err => {
			console.log(err);
		});
	}

	private initChart() {
		// this.dataChartLabels = this.dataSets = [];
		this.changeChartLabels(this.selectedTimeUnit);
	}

	// -------- END INIT SECTION --------------

	// -------- UPDATE GUI EVENT --------------
	protected hideTimeUnitsComponent() {
		if (this._currentChartType === CHART_TYPES.LINE_CHART)
			this.timeUnitsVisibility = 'visible';
		else
			this.timeUnitsVisibility = 'hidden';
	}

	public selectData(event: any) {
		console.log('selectData');
		this._messageService.add({
			severity: 'info',
			summary: 'Data Selected',
			detail: `${this.data.datasets[event.element._datasetIndex].data[event.element._index].toString()} ${this.unitName}`,
		});
	}

	private processAndSetCalendar(): void {
		// const minYear: number = 2000;
		// let maxDate: Date = new Date();
		// maxDate.setHours(0, 0, 0, 0);
		// let minDate: Date = new Date(`${minYear}-01-01T00:00:00`);

		// if (!this._currentDateFrom && !this._currentDateTo) {
		// 	this.dateFrom.minYearValue = this.dateTo.minYearValue = minYear;

		// 	this._currentDateTo = maxDate;
		// 	this._currentDateFrom = new Date(this._currentDateTo.getTime() - TIME_PERIODS_IN_MILISECS.WEEK);
		// }

		// const currentMonthFrom: number = this._currentDateFrom.getMonth() + 1;
		// const currentMonthTo: number = this._currentDateTo.getMonth() + 1;
		// const currentYearFrom: number = this._currentDateFrom.getFullYear();
		// const currentYearTo: number = this._currentDateTo.getFullYear();
		// const nextArrow = document.getElementsByClassName('ui-datepicker-next');
		// const prevArrow = document.getElementsByClassName('ui-datepicker-prev');

		// switch (this.selectedTimeUnit) {
		// 	case TIME_UNITS.DAY:
		// 		this._currentDateFrom.setHours(0, 0, 0, 0);
		// 		this._currentDateTo.setHours(0, 0, 0, 0);
		// 		if (this._currentDateFrom.getTime() >= this._currentDateTo.getTime()) {
		// 			this._currentDateTo.setTime(this._currentDateFrom.getTime() + TIME_PERIODS_IN_MILISECS.WEEK);
		// 		}

		// 		if (this._currentChartType != CHART_TYPES.PIE_CHART) {
		// 			if ((maxDate.getTime() - this._currentDateFrom.getTime()) < TIME_PERIODS_IN_MILISECS.MONTH_THIRTY_ONE) {
		// 				this._currentDateTo = maxDate;
		// 				this._dateToContext.maxDate = maxDate;
		// 			}
		// 			this._currentDateTo = new Date(this._currentDateFrom.getTime() + TIME_PERIODS_IN_MILISECS.MONTH_THIRTY_ONE);
		// 			this._dateToContext.maxDate = this._currentDateTo;
		// 		}
		// 		else this._dateToContext.maxDate = maxDate;
		// 		// if (currentMonthFrom == 11 && currentYearFrom == this.dateFrom.maxYearValue) {
		// 		// 	nextArrow[0]
		// 		// }
		// 		// else if (currentMonthFrom == 0 && currentYearFrom == this.dateFrom.minYearValue) {
		// 		// 	this._renderer.setStyle(prevArrow[0], 'visibility', 'hidden');
		// 		// }
		// 		// else if (currentMonthTo == 11 && currentYearTo == this.dateTo.maxYearValue) {
		// 		// 	this._renderer.setStyle(nextArrow[0], 'visibility', 'hidden');
		// 		// }
		// 		// else if (currentMonthTo == 0 && currentYearTo == this.dateTo.minYearValue) {
		// 		// 	this._renderer.setStyle(prevArrow[0], 'visibility', 'hidden');
		// 		// }
		// 		// else {
		// 		// 	this._renderer.setStyle(nextArrow[0], 'visibility', 'visible');
		// 		// 	this._renderer.setStyle(prevArrow[0], 'visibility', 'visible');
		// 		// }
		// 		break;
		// 	case TIME_UNITS.MONTH:
		// 		this._currentDateFrom.setDate(1);
		// 		this._currentDateTo.setDate(1);
		// 		if ((currentMonthFrom >= currentMonthTo) && (currentYearFrom >= currentYearTo)) {
		// 			this._currentDateTo.setMonth(currentMonthTo + 1);
		// 			this._currentDateTo.setFullYear(currentYearFrom);
		// 		}
		// 		break;
		// 	case TIME_UNITS.YEAR:
		// 		this._currentDateFrom.setDate(1);
		// 		this._currentDateTo.setDate(1);
		// 		this._currentDateFrom.setMonth(1);
		// 		this._currentDateTo.setMonth(1);
		// 		if (currentYearFrom >= currentYearTo) {
		// 			this._currentDateTo.setFullYear(currentYearFrom + 1);
		// 		}
		// 		break;
		// }
		// this._dateFromContext.maxDate = maxDate;
		// this._dateFromContext.minDate = minDate;
		// this._dateFromContext.value = this._currentDateFrom;
		// this._dateToContext.value = this._currentDateTo;
		// this._dateToContext.minDate = this._currentDateFrom;
		// this._dateFromContext.updateInputfield();
		// this._dateToContext.updateInputfield();
	}

	public onTimeUnitChange(event: any) {
		this.selectedTimeUnit = event.value;
		this.changeCalendarView(event.value);
		this.changeChartLabels(event.value);
		this.processAndSetCalendar();
		this.refreshChart();
	}

	private changeCalendarView(timeUnit: TIME_UNITS) {
		switch (timeUnit) {
			case TIME_UNITS.DAY:
				this.dateFrom.switchToDailyView();
				this.dateTo.switchToDailyView();
				break;
			case TIME_UNITS.MONTH:
				this.dateFrom.switchToMonthlyView();
				this.dateTo.switchToMonthlyView();
				break;
			case TIME_UNITS.YEAR:
				this.dateFrom.switchToYearlyView();
				this.dateTo.switchToYearlyView();
				break;
		}
	}

	private changeChartLabels(timeUnit: TIME_UNITS) {
		// switch (timeUnit) {
		// 	case TIME_UNITS.DAY:
		// 		let dateLabelsArr: string[] = [];
		// 		for (let d = this._currentDateFrom; d <= this._currentDateTo; d = new Date(d.getTime() + TIME_PERIODS_IN_MILISECS.DAY)) {
		// 			dateLabelsArr.push(`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear().toString().substr(2, 2)}`);
		// 		}
		// 		this.numberOfDataPoints = dateLabelsArr.length;
		// 		this.dataChartLabels = dateLabelsArr;
		// 		break;
		// 	case TIME_UNITS.MONTH:
		// 		let monthLabelsArr: string[] = [];
		// 		let currentMonth: number = this._currentDateFrom.getMonth() + 1;
		// 		let currentYear: number = this._currentDateFrom.getFullYear();
		// 		const targetMonth: number = this._currentDateTo.getMonth() + 1;
		// 		const targetYear: number = this._currentDateTo.getFullYear();
		// 		do {
		// 			monthLabelsArr.push(`${currentMonth}/${currentYear}`);
		// 			if (currentMonth <= 12) {
		// 				currentMonth += 1;
		// 			}
		// 			else {
		// 				currentMonth = 1;
		// 				currentYear += 1;
		// 			}
		// 		} while ((currentYear <= targetYear) && (currentMonth <= targetMonth));
		// 		this.numberOfDataPoints = monthLabelsArr.length;
		// 		this.dataChartLabels = monthLabelsArr;
		// 		break;
		// 	case TIME_UNITS.YEAR:
		// 		let yearLabelsArr: string[] = [];
		// 		let currentFullYear: number = this._currentDateFrom.getFullYear();
		// 		const targetFullYear: number = this._currentDateTo.getFullYear();
		// 		while (currentFullYear <= targetFullYear) {
		// 			yearLabelsArr.push(`${currentFullYear}`);
		// 			currentFullYear += 1;
		// 		}
		// 		this.numberOfDataPoints = yearLabelsArr.length;
		// 		this.dataChartLabels = yearLabelsArr;
		// 		break;
		// }
	}

	public onChartTypeClick(event: any) {
		this.chart.type = event.option.value;
		this._currentChartType = event.option.value;
		this.hideTimeUnitsComponent();
		this.refreshChart();
	}

	public onDateFromSelect(event: any) {
		this._currentDateFrom = event;
		if (this.validateCalendars()) {
			this.processAndSetCalendar();
			this.refreshChart();
		}
	}

	public onDateToSelect(event: any) {
		this._currentDateTo = event;
		if (this.validateCalendars()) {
			this.processAndSetCalendar();
			this.refreshChart();
		}
	}

	private validateCalendars(): boolean {
		const from = this.dateFrom.getValue(), to = this.dateTo.getValue();
		if (!!from && !!to && from.getTime() >= to.getTime()) {
			console.log(`dateFrom = ${from.getTime()}, dateTo = ${to.getTime()}`);
			this._messageService.add({
				severity: 'warn',
				summary: 'Error date input',
				detail: 'Date from value must be smaller than date to value.',
			});
			return false;
		}
		return true;
	}

	// -------- END UPDATE GUI EVENTS --------------

	private async refreshChart() {
		// This condition for make sure that enough data input to refresh chart
		if (this._currentDateFrom && this._currentDateTo) {
			this.initChart();
			await this.fetchData();
			this.updateChart();
		}
	}

	protected updateChart() {
		this.data.labels = this.dataChartLabels;
		this.data.datasets = this.dataSets;
		this.chart.reinit();
	}

	protected generateFakeDataPoints(quantity: number): number[] {
		let arr: number[] = [];
		for (let i = 0; i < quantity + 1; i++) {
			arr.push(Math.round(Math.random() * 100));
		}
		return arr;
	}

	protected async fetchData() {
		// Get data from server here
		let dataChart: DataChart;
		if (this._currentChartType === CHART_TYPES.LINE_CHART) {
			dataChart = await this.fetchLineChartData();
		}
		else if (this._currentChartType === CHART_TYPES.PIE_CHART) {
			dataChart = await this.fetchPieChartData(); // .then(value => dataChart = value);
		}
		else if (this._currentChartType === CHART_TYPES.BAR_CHART) {
			dataChart = await this.fetchBarChartData();
		}
		if (dataChart) {
			this.dataChartLabels = dataChart.labels;
			this.dataSets = dataChart.datasets;
		}
	}

	protected abstract fetchBarChartData(): Promise<DataChart>;
	protected abstract fetchPieChartData(): Promise<DataChart>;
	protected abstract fetchLineChartData(): Promise<DataChart>;
}
