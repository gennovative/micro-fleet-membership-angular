import { TIME_UNITS } from '../../pages/data-types/ggm-types';

export class GGMUtil {
	/**
	 * This function to remove all comma and dot in string and transfer and return to number
	 * @param money is a money string displayed with comma or dot. EX: 20,000 or 20.000
	 */
	public static changeMoneyToNumber(money: string): number {
		let result: number = 0;
		let strMoney = money.toString();
		while (strMoney.indexOf(',') > 0) {
			strMoney = strMoney.replace(',', '');
		}
		while (strMoney.indexOf('.') > 0) {
			strMoney = strMoney.replace('.', '');
		}
		result = Number(strMoney);
		return result;
	}

	public static generateLabelWithTimeUnit(date: Date, timeUnit: TIME_UNITS): string {
		switch (timeUnit) {
			case TIME_UNITS.DAY:
				return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
			case TIME_UNITS.MONTH:
				return `${date.getMonth() + 1}/${date.getFullYear()}`;
			case TIME_UNITS.YEAR:
				return `${date.getFullYear()}`;
		}
	}

	public static dateIncrease(date: Date, timeUnit: TIME_UNITS) {
		switch (timeUnit) {
			case TIME_UNITS.DAY: date.setDate(date.getDate() + 1); break;
			case TIME_UNITS.MONTH: date.setMonth(date.getMonth() + 1); break;
			case TIME_UNITS.YEAR: date.setFullYear(date.getFullYear() + 1); break;
		}
	}
}
