import { Component } from '@angular/core';

@Component({
	selector: 'ggm-dashboard',
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

	public nRows = Array(50).fill(0);
}
