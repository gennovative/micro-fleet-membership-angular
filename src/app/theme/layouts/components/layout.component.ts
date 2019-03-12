import { Component, HostBinding, Input, OnInit } from '@angular/core';


// Use ng-template #header to do conditional ng-content select.
// See more https://github.com/angular/angular/issues/22972#issuecomment-407358396

@Component({
	// tslint:disable-next-line:component-selector
	selector: '.ggm-layout',
	template: `
		<ng-template #header><ng-content select=".ggm-layout-header"></ng-content></ng-template>
		<ng-template #footer><ng-content select=".ggm-layout-footer"></ng-content></ng-template>

		<ng-template [ngIf]="!isSubHeader">
			<ng-container *ngTemplateOutlet="header"></ng-container>
		</ng-template>
		<div class="ggm-layout-box">
			<ng-content select=".ggm-layout-sidebar"></ng-content>
			<div class="ggm-layout-box ggm-dir-vertical">
				<ng-template [ngIf]="isSubHeader">
					<ng-container *ngTemplateOutlet="header"></ng-container>
				</ng-template>
				<ng-content select=".ggm-layout-content"></ng-content>
				<ng-template [ngIf]="isSubFooter">
					<ng-container *ngTemplateOutlet="footer"></ng-container>
				</ng-template>
			</div>
		</div>
		<ng-template [ngIf]="!isSubFooter">
			<ng-container *ngTemplateOutlet="footer"></ng-container>
		</ng-template>
	`,
})
export class GgmLayoutComponent implements OnInit {

	@Input('subheader')
	public subHeaderAttr: boolean;

	@Input('subfooter')
	public subFooterAttr: boolean;

	@HostBinding('class.ggm-dir-vertical')
	public get directionVertical(): boolean {
		return !(this.isSubHeader && this.isSubFooter);
	}

	public get isSubHeader(): boolean {
		return (this.subHeaderAttr != undefined);
	}

	public get isSubFooter(): boolean {
		return (this.subFooterAttr != undefined);
	}

	public ngOnInit(): void {
		console.log({ isSubFooter: this.isSubFooter });
	}
}
