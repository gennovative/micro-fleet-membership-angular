//
// Types
//

export type ChartTypeSelectButton = {
	label: string,
	value: CHART_TYPES,
	icon: string,
};

export type DataBarChart = {
	label: string,
	data: number[],
	backgroundColor: string,
	borderColor: string,
};

export type DataLineChart = {
	label: string,
	data: number[],
	fill: boolean,
	borderColor: string,
};
export type DataPieChart = {
	data: number[],
	backgroundColor: string[],
	hoverBackgroundColor: string[],
};
export type DataChartType = DataLineChart | DataPieChart | DataBarChart;

export type DataChart = {
	labels: string[],
	datasets: DataChartType[],
};

//
// Constants
//
export const enum CHART_TYPES {
	BAR_CHART = 'bar',
	LINE_CHART = 'line',
	PIE_CHART = 'pie',
}

export const CHART_TYPES_SELECT_BUTTON_DATA = {
	BAR_CHART: {label: CHART_TYPES.LINE_CHART, value: CHART_TYPES.BAR_CHART, icon: 'fas fa-chart-bar'},
	LINE_CHART: {label: CHART_TYPES.LINE_CHART, value: CHART_TYPES.LINE_CHART, icon: 'fas fa-chart-line'},
	PIE_CHART: {label: CHART_TYPES.PIE_CHART, value: CHART_TYPES.PIE_CHART, icon: 'fas fa-chart-pie'},
};

export const enum TIME_UNITS {
	DAY = 'day',
	MONTH = 'month',
	YEAR = 'year',
}

export const enum REPORT_PAGES {
	TICKET_REPORT = 'ticket',
	REVENUE_REPORT = 'revenue',
	VISITORS_EXP_REPORT = 'visitor-experience',
}

export const enum TIME_PERIODS_IN_MILISECS {
	DAY = 86400000,
	WEEK = DAY * 7,
	MONTH_THIRTY = DAY * 30,
	MONTH_THIRTY_ONE = DAY * 31,
	MONTH_FEBRUARY = DAY * 28,
	MONTH_FEBRUARY_LEAP = DAY * 29,
	YEAR = MONTH_THIRTY * 4 + MONTH_THIRTY_ONE * 7 + MONTH_FEBRUARY,
	YEAR_LEAP = MONTH_THIRTY * 4 + MONTH_THIRTY_ONE * 7 + MONTH_FEBRUARY_LEAP,
}

// tslint:disable-next-line:max-line-length
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'November'];
export const DAYS = [
	'1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
	'17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31',
];
