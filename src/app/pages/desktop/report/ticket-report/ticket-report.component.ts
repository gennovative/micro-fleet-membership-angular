import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ReportComponent } from '../report/report.component';
import { DataChart, DataPieChart, CHART_TYPES_SELECT_BUTTON_DATA, DataLineChart, TIME_UNITS } from '../../../data-types/ggm-types';
import { GGMUtil } from '@@core/utils/ggm-util';
import { TicketReportService } from '@@core/services/ticket-report.service';

/**
 	Chart xem thống kê về số lượng vé:
	- Trong 1 khoảng thời gian, xem tổng số lượng vé của từng loại bán ra là bao nhiêu. --> pie chart
	- Trong 1 khoảng thời gian, xem tổng số lượng vé của từng loại bán ra theo từng đơn vị thời gian (ngày, tháng, năm). --> line chart
 */
@Component({
	selector: 'ggm-ticket-report',
	// templateUrl: '../report//report.component.html',
	templateUrl: 'ticket-report.component.html',
	// styleUrls: ['../report/report.component.scss'],
	styleUrls: ['ticket-report.component.scss'],
	providers: [TicketReportService],
})
export class TicketReportComponent extends ReportComponent implements OnInit {

	public rangeValues: number[] = [0, 100];
	constructor(
		protected _messageService: MessageService,
		protected _reportService: TicketReportService,
	) {
		super(_messageService, _reportService);
		this.reportName = 'Ticket';
		this.chartTypesForSelectButton = [
			CHART_TYPES_SELECT_BUTTON_DATA.PIE_CHART,
			CHART_TYPES_SELECT_BUTTON_DATA.LINE_CHART,
		];
		this.unitName = 'tickets';
	}

	public async fetchPieChartData(): Promise<DataChart> {
		if (!!this.dateFrom.getValue() === false || !!this.dateTo.getValue() === false) {
			console.error('Please input date from and date to');
			return null;
		}

		return this._reportService.fetchPieChartTicket(this.dateFrom.getValue(), this.dateTo.getValue())
		.toPromise().then(
			value => {
				let dataChart: DataChart = {labels: [], datasets: []};
				dataChart.labels = value.ticketName;
				dataChart.datasets.push({
					data: [],
					backgroundColor: [],
					hoverBackgroundColor: [],
				});
				(<DataPieChart>dataChart.datasets[0]).data = value.quantity;

				dataChart.labels.forEach(() => {
					const color = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
					(<DataPieChart>dataChart.datasets[0]).backgroundColor.push(color);
					(<DataPieChart>dataChart.datasets[0]).hoverBackgroundColor.push(color);
				});

				return dataChart;
				// this.dataChartLabels = value.ticketName;
				// (<DataPieChart>this.dataSets[0]).data = value.quantity;
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

		return this._reportService.fetchLineChartTicket(dateFrom, dateTo, this.selectedTimeUnit)
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
						const valueRes = res[ticketName][dateIndex.toDateString()];
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
