import { GgmMenuItem } from '@@theme/layouts/components/stack-menu.component';

export const MENU_ITEMS: GgmMenuItem[] = [
	{
		label: 'Dashboard',
		title: 'Dashboard',
		icon: 'fas fa-chart-line',
		routerLink: ['/dashboard'],
	},
	{
		label: 'Profile',
		title: 'Profile',
		icon: 'fas fa-user',
		routerLink: ['/accounts/profile'],
	},
	{
		label: 'Ticket',
		title: 'Ticket',
		// icon: 'far fa-calendar-check',
		items: [
			{
				label: 'Ticket Type',
				title: 'Ticket manager',
				icon: 'fas fa-ticket-alt',
				routerLink: ['/tickets'],
			},
			{
				label: 'Ticket Combo',
				title: 'Ticket combo manager',
				icon: 'far fa-calendar-check',
				routerLink: ['/combos'],
			},
		],
	},
	{
		label: 'Souvenir',
		title: 'Souvenir',
		// icon: 'far fa-calendar-check',
		items: [
			{
				label: 'Souvenir Type',
				title: 'Souvenir Type',
				icon: 'fas fa-gift',
				routerLink: ['/souvenir-type'],
			},
			{
				label: 'Souvenir List',
				title: 'Souvenir List',
				icon: 'fas fa-list',
				routerLink: ['/souvenir'],
			},
		],
	},
	{
		label: 'Accounts',
		title: 'Accounts',
		items: [
			{
				label: 'Accounts List',
				title: 'Accounts List',
				icon: 'fas fa-list',
				routerLink: ['/accounts'],
			},
			{
				label: 'Roles List',
				title: 'Roles List',
				icon: 'fas fa-list',
				routerLink: ['/accounts/roles'],
			},
		],
	},
	{
		label: 'Reports',
		title: 'Reports',
		// icon: 'far fa-calendar-check',
		items: [
			{
				label: 'Ticket report',
				title: 'Ticket report',
				icon: 'fas fa-ticket-alt',
				routerLink: ['/reports/ticket'],
			},
			{
				label: 'Revenue report',
				title: 'Revenue report',
				icon: 'fas fa-hand-holding-usd',
				routerLink: ['/reports/revenue'],
			},
			{
				label: 'Visitors experience report',
				title: 'Visitors experience report',
				icon: 'fas fa-users',
				routerLink: ['/reports/visitors-experience'],
			},
		],
	},
];
