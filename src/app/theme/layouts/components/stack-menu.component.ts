import { Component, Input, TemplateRef, ViewChild,
	QueryList, AfterViewInit, AfterViewChecked, ElementRef } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

/**
 * Represents the model for menu item.
 */
export interface GgmMenuItem {
	/**
	 * Id of the item.
	 */
	id?: any;

	/**
	 * Displayed text of the item.
	 */
	label?: string;

	/**
	 * Tooltip text of the item.
	 */
	title?: string;

	/**
	 * Icon of the item.
	 */
	icon?: string;

	/**
	 * Callback to execute when item is clicked.
	 */
	command?: Function;

	/**
	 * RouterLink definition for internal navigation.
	 */
	routerLink?: any[];

	/**
	 * Configuration for active router link.
	 */
	routerLinkActiveOptions?: any;

	/**
	 * External link to navigate when item is clicked.
	 */
	url?: string;

	/**
	 * Specifies where to open the linked document.
	 */
	urlTarget?: string;

	/**
	 * Whether the DOM element of item is created or not.
	 */
	visible?: boolean;

	/**
	 * An array of children items.
	 */
	items?: GgmMenuItem[];

	/**
	 * Visibility of submenu.
	 */
	expanded?: boolean;
}

@Component({
	selector: 'ggm-stack-menu',
	styleUrls: ['./stack-menu.component.scss'],
	templateUrl: './stack-menu.component.html',
})
export class GgmStackMenuComponent implements AfterViewInit, AfterViewChecked {
	@Input()
	public itemTpl: TemplateRef<any>;

	@Input()
	public itemContentTpl: TemplateRef<any>;

	@Input()
	public items: GgmMenuItem[];

	@Input()
	public trackByProp: string;

	@Input()
	public trackBy: Function;

	@ViewChild('li')
	private _activeItems: QueryList<any>;

	private _hostElem: HTMLElement;
	private _highlighted: boolean;

	constructor(elem: ElementRef, router: Router) {
		this._hostElem = elem.nativeElement;
		this._highlighted = false;
		this._handleRouterEvent(router);
	}

	public ngAfterViewInit(): void {
		this._highlightActiveSubmenu();
	}

	public ngAfterViewChecked(): void {
		this._highlightActiveSubmenu();
	}

	public trackItem(index: number, item: GgmMenuItem): any {
		if (!item) { return undefined; }

		if (this.trackByProp && item[this.trackByProp]) {
			return item[this.trackByProp];
		}

		return (item.label ?
			item.label :
			(item.id ? item.id : undefined));
	}

	private _highlightActiveSubmenu(): void {
		if (this._highlighted) { return; }

		const hostElem = this._hostElem;
		const activeItem = hostElem.querySelector('.ggm-menu-item--active');
		if (!activeItem) { return; }

		// Traverse from leaf element to menu host element.
		let elem = activeItem as HTMLElement;
		while (elem !== hostElem) {
			// Highlight active item
			if (elem.matches('.ggm-menu-item:not(.ggm-menu-item--active)')) {
				this._highlightItemContent(elem);
				this._highlighted = true;
				console.log('activated');
			}
			// Expand active submenu
			if (elem.matches('.ggm-menu-haschild')) {
				elem.classList.add('ggm-menu-item--expanded');
				this._highlighted = true;
				console.log('expanded');
			}
			elem = elem.parentElement;
		}
	}

	private _highlightItemContent(contentElem: HTMLElement): void {
		contentElem && contentElem.classList.add('ggm-menu-item--active');
	}

	private _unhighlightActiveItems(): void {
		const contents = this._hostElem.querySelectorAll('.ggm-menu-item--active');
		if (!contents) { return; }
		for (let i = 0, len = contents.length; i < len; ++i) {
			contents.item(i).classList.remove('ggm-menu-item--active');
		}
	}

	private _handleRouterEvent(router: Router): void {
		router.events.subscribe((evt: any) => {
			if ( (evt instanceof NavigationEnd)) {
				// this._highlighted = false;
				// this._highlightActiveSubmenu();
				this._unhighlightActiveItems();
			}
		});
	}

	public toggleSubmenu(menuItem: HTMLElement): void {
		if (menuItem.matches('.ggm-menu-haschild')) {
			menuItem.classList.toggle('ggm-menu-item--expanded');
		}
	}

	public delegate($event: UIEvent, selector: string, handler: Function) {
		const topElem = $event.currentTarget as HTMLElement;
		const possibleTargets = Array.from(topElem.querySelectorAll(selector));

		let el = $event.target as Element;
		while (el && el !== topElem) {
			if (possibleTargets.indexOf(el) >= 0) {
				return handler.call(this, el);
			}

			el = el.parentNode as Element;
		}
	}
}
