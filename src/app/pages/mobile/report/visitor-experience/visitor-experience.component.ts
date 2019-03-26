import { Component, OnInit } from '@angular/core';
import { ReportComponent } from '../report/report.component';
import { MessageService } from 'primeng/api';
import { DataChart, DataLineChart, CHART_TYPES_SELECT_BUTTON_DATA, TIME_UNITS } from '../../../data-types/ggm-types';
import { GGMUtil } from '@@core/utils/ggm-util';
import { VisitorExperienceService } from '@@core/services/visitor-experience.service';

@Component({
	selector: 'ggm-visitor-experience',
	templateUrl: '../report/report.component.html',
	styleUrls: ['../report/report.component.scss'],
	providers: [VisitorExperienceService],
})
export class VisitorExperienceComponent extends ReportComponent implements OnInit {

	// private _mostPlayingTime: number = 0;
	// private _leastPlayingTime: number = 0;

	constructor(
		protected _messageService: MessageService,
		protected _reportService: VisitorExperienceService,
	) {
		super(_messageService, _reportService);
		this.reportName = 'Visitors Experience';
		this.chartTypesForSelectButton = [
			CHART_TYPES_SELECT_BUTTON_DATA.LINE_CHART,
		];
		this.unitName = 'minutes';
	}

	public async fetchPieChartData(): Promise<DataChart> {
		throw new Error('Method not implemented.');
	}

	public fetchLineChartData(): Promise<DataChart> {
		const dateFrom: Date = this.dateFrom.getValue();
		const dateTo: Date = this.dateTo.getValue();
		if (!!dateFrom === false || !!dateTo === false) {
			console.error('Please input date from and date to');
			return null;
		}

		return this._reportService.fetchLineChartVisitor(dateFrom, dateTo, this.selectedTimeUnit)
		.toPromise().then(
			res => {
				const dataChart: DataChart = {labels: [], datasets: []};

				Object.getOwnPropertyNames(res).forEach(visitorName => {
					(<DataLineChart[]>dataChart.datasets).push({
						label: visitorName,
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
				// this._leastPlayingTime = this._mostPlayingTime = -1;
				while (dateIndex.getTime() <= dateTo.getTime()) {
					dataChart.labels.push(GGMUtil.generateLabelWithTimeUnit(dateIndex, this.selectedTimeUnit));
					dataChart.datasets.forEach(lineChart => {
						const visitorName = (<DataLineChart>lineChart).label;
						let valueRes = res[visitorName][dateIndex.toDateString()];
						if (!valueRes) valueRes = 0; // on time unit don't have any ticket saled.
						lineChart.data.push(valueRes); // on time unit have ticket saled, get value from server

						// if (valueRes > this._mostPlayingTime || this._mostPlayingTime === -1) this._mostPlayingTime = valueRes;
						// if (valueRes < this._leastPlayingTime || this._leastPlayingTime === -1) this._leastPlayingTime = valueRes;
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
