import { Component } from '@angular/core';


/**
 * Page layout for desktop, no responsive support because there should be
 * another layout for mobile.
 * This component comes with a SCSS file, but does not include it
 * in 'styleUrls' property, because the styles are not scoped to this
 * component, but to the whole webpage. So the SCSS file is imported in
 * global 'src/styles.scss'
 */
@Component({
	selector: 'ggm-main-layout',
	template: `
		<div class="ggm-layout" subfooter>
			<ggm-header class="ggm-layout-header mat-elevation-z3" sticky></ggm-header>

			<nav class="ggm-layout-sidebar" sticky sidebarName="mainMenu">
				<p-scrollPanel>
					<ng-content select=".main-menu"></ng-content>
				</p-scrollPanel>
			</nav>

			<div class="ggm-layout-content">
				<ng-content select="router-outlet"></ng-content>
			</div>

			<ggm-footer class="ggm-layout-footer"></ggm-footer>
		</div>
	`,
})
export class MainLayoutComponent {
}
