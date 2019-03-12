import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { CapitalizePipe, PluralPipe, RoundPipe, TimingPipe, SafeUrlPipe } from './pipes';
import { ToastModule } from 'primeng/toast';
import { MenuModule} from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PickListModule } from 'primeng/picklist';
import { KeyFilterModule } from 'primeng/keyfilter';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ChartModule } from 'primeng/chart';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { GgmCalendarComponent } from '../pages/report/view-models/ggm-calendar';

const UI_MODULES = [
	ButtonModule,
	CalendarModule,
	CardModule,
	CheckboxModule,
	ConfirmDialogModule,
	DialogModule,
	DropdownModule,
	FormsModule,
	InputTextModule,
	InputTextareaModule,
	KeyFilterModule,
	OverlayPanelModule,
	PaginatorModule,
	PanelModule,
	PanelMenuModule,
	PasswordModule,
	PickListModule,
	MenuModule,
	MessageModule,
	MessagesModule,
	ReactiveFormsModule,
	ScrollPanelModule,
	TableModule,
	ToastModule,
	ToolbarModule,
	TooltipModule,
	ChartModule,
	SelectButtonModule,
	SliderModule,
];

const PIPES = [
	CapitalizePipe,
	PluralPipe,
	RoundPipe,
	TimingPipe,
	SafeUrlPipe,
	GgmCalendarComponent,
];

/**
 * Provides components, pipes and other template utils.
 * SharedModule should be imported directly by the module using its features.
 */
@NgModule({
	imports: [
		CommonModule,
		...UI_MODULES,
	],
	exports: [
		...PIPES,
		...UI_MODULES,
	],
	declarations: [
		...PIPES,
	],
})
export class SharedModule {
}
