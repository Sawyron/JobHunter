export class DepositCalculator {
  private readonly monthsToPercent: Map<number, number>;

  constructor(monthsToPercent: Map<number, number>) {
    this.monthsToPercent = new Map(monthsToPercent);
  }

  public calculateDeposit(deposit: number, period: number): number {
    const persent = this.monthsToPercent.get(period);
    if (persent === undefined) {
      throw new Error(`No percent is defined for period ${period}`);
    }
    return deposit * Math.pow(1 + persent / 12, period);
  }
}
