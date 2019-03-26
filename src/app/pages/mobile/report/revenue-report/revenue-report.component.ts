import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { ReportComponent } from '../report/report.component';
import { DataChart, DataPieChart, DataLineChart, CHART_TYPES_SELECT_BUTTON_DATA, TIME_UNITS } from '../../../data-types/ggm-types';
import { GGMUtil } from '@@core/utils/ggm-util';
import { RevenueReportService } from '@@core/services/revenue-report.service';

/*
	Chart xem thống kê về tiền:
	- Trong 1 khoảng thời gian, xem tổng doanh thu theo từng loại vé. --> pie chart
	- Trong 1 khoảng thời gian, xem tổng doanh thu theo từng đơn vị thời gian (ngày, tháng, năm) -> line chart
*/
@Component({
	selector: 'ggm-revenue-report',
	templateUrl: '../report//report.component.html',
	styleUrls: ['../report/report.component.scss'],
	providers: [RevenueReportService],
})
export class RevenueReportComponent extends ReportComponent implements OnInit {

	constructor(
		protected _messageService: MessageService,
		protected _reportService: RevenueReportService,
	) {
		super(_messageService, _reportService);
		this.reportName = 'Revenue';
		this.chartTypesForSelectButton = [
			CHART_TYPES_SELECT_BUTTON_DATA.PIE_CHART,
			CHART_TYPES_SELECT_BUTTON_DATA.LINE_CHART,
		];
		this.unitName = 'million VND';
	}

	public async fetchPieChartData(): Promise<DataChart> {
		if (!!this.dateFrom.getValue() === false || !!this.dateTo.getValue() === false) {
			console.error('Please input date from and date to');
			return null;
		}

		return this._reportService.fetchPieChartRevenue(this.dateFrom.getValue(), this.dateTo.getValue())
		.toPromise().then(
			value => {
				let dataChart: DataChart = {labels: [], datasets: []};
				dataChart.labels = value.ticketName;
				dataChart.datasets.push({
					data: [],
					backgroundColor: [],
					hoverBackgroundColor: [],
				});
				(<DataPieChart>dataChart.datasets[0]).data = value.revenue;

				dataChart.labels.forEach(() => {
					const color = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
					(<DataPieChart>dataChart.datasets[0]).backgroundColor.push(color);
					(<DataPieChart>dataChart.datasets[0]).hoverBackgroundColor.push(color);
				});

				return dataChart;
			},
		);
	}

	public fetchLineChartData(): Promise<DataChart> {
		const dateFrom: Date = this.dateFrom.getValue();
		const dateTo: Date = this.dateTo.getValue();
		if (!!dateFrom === false || !!dateTo === false) {
			console.error('Please input date from and date to');
			return null;
		}

		return this._reportService.fetchLineChartRevenue(this.dateFrom.getValue(), this.dateTo.getValue(), this.selectedTimeUnit)
		.toPromise().then(
			res => {
				const dataChart: DataChart = {labels: [], datasets: []};

				Object.getOwnPropertyNames(res).forEach(ticketName => {
					(<DataLineChart[]>dataChart.datasets).push({
						label: ticketName,
						data: [],
						fill: false,
						borderColor: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6),
					});
				});

				let dateIndex: Date = new Date(dateFrom);
				switch (this.selectedTimeUnit) {
					case TIME_UNITS.MONTH:
						dateIndex.setDate(1);
						break;
					case TIME_UNITS.YEAR:
						dateIndex.setDate(1);
						dateIndex.setMonth(0);
						break;
				}
				while (dateIndex.getTime() <= dateTo.getTime()) {
					dataChart.labels.push(GGMUtil.generateLabelWithTimeUnit(dateIndex, this.selectedTimeUnit));
					dataChart.datasets.forEach(lineChart => {
						const ticketName = (<DataLineChart>lineChart).label;
						const valueRes = res[ticketName][dateIndex.toDateString()] / 1000000; // division with 1 million to convert money to million unit
						if (!valueRes)
							lineChart.data.push(0); // on time unit don't have any ticket saled.
						else
							lineChart.data.push(valueRes); // on time unit have ticket saled, get value from server
					});
					// Increase dateIndex to 1 time unit
					GGMUtil.dateIncrease(dateIndex, this.selectedTimeUnit);
				}

				return dataChart;
			},
		);
	}

	protected fetchBarChartData(): Promise<DataChart> {
		throw new Error('Method not implemented.');
	}
}
