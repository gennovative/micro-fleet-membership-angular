import { Injectable } from '@angular/core';

const OFFCANVAS_CLASS = 'ggm-sidebar--offcanvas';

export class GgmSidebar {

	public static findSidebar(name: string): GgmSidebar {
		const sidebarElem = document.querySelector(`[sidebarName]`) as HTMLElement;
		return sidebarElem ? new GgmSidebar(sidebarElem, name) : null;
	}

	/**
	 * Gets HTML element.
	 */
	public get element(): HTMLElement {
		return this._elem;
	}

	/**
	 * Gets sidebar name.
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Checks if this sidebar is in offcanvas mode.
	 */
	public get isOffCanvas(): boolean {
		return this._elem.matches(
			`.${OFFCANVAS_CLASS} .ggm-layout-sidebar[sidebarName="${this._name}"]`,
		);
	}

	private constructor(
		private _elem: HTMLElement,
		private _name: string) {
	}

	/**
	 * Expands sidebar if it is in offcanvas mode, otherwise, push it offcanvas.
	 * Returns value equivalent to "isOffCanvas" after toggling.
	 */
	public toggle(): boolean {
		const layoutElem = this._findAncestor(this._elem, '.ggm-layout');
		return layoutElem.classList.toggle(OFFCANVAS_CLASS);
	}

	/**
	 * Expands sidebar if it is in offcanvas mode.
	 */
	public show(): void {
		const layoutElem = this._findAncestor(this._elem, '.ggm-layout');
		if (layoutElem.classList.contains(OFFCANVAS_CLASS)) { return; }
		layoutElem.classList.add(OFFCANVAS_CLASS);
	}

	/**
	 * Pushes sidebar offcanvas if it is in expanded mode.
	 */
	public hide(): void {
		const layoutElem = this._findAncestor(this._elem, '.ggm-layout');
		if (!layoutElem.classList.contains(OFFCANVAS_CLASS)) { return; }
		layoutElem.classList.remove(OFFCANVAS_CLASS);
	}

	private _findAncestor(elem: HTMLElement, selector: string) {
		while ((elem = elem.parentElement) && !elem.matches(selector));
		return elem;
	}
}

@Injectable()
export class GgmSidebarService {

	public getSidebar(name: string): GgmSidebar {
		return GgmSidebar.findSidebar(name);
	}
}
