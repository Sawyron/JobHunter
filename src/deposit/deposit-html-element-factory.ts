import { DepositCalculator } from './deposit-calculator.js';

export interface IDepositElementProps {
  name: string;
  monthsToPercent: Map<number, number>;
}

export function initializeDepositHtmlElement(
  configurations: IDepositElementProps[]
) {
  const nameToMap = new Map(
    configurations.map(({ name, monthsToPercent }) => [name, monthsToPercent])
  );
  const root = document.querySelector<HTMLElement>('.deposit-calculator')!;
  const depositTypeSelector = root.querySelector<HTMLSelectElement>(
    'select#deposit-type'
  );
  const periodSelector = root.querySelector<HTMLSelectElement>(
    'select#deposit-period'
  )!;
  depositTypeSelector?.append(
    ...Array.from(nameToMap.keys()).map(name => {
      const option = document.createElement('option');
      option.value = name;
      option.innerText = name;
      return option;
    })
  );
  depositTypeSelector?.addEventListener('change', e => {
    e.preventDefault();
    const depositType = (e.target as HTMLSelectElement).value;
    attachPeriods(root, depositType, nameToMap);
  });
  periodSelector.addEventListener('change', e => {
    e.preventDefault();
    const depositType = depositTypeSelector!.value;
    const currentMap = nameToMap.get(depositType);
    attachDepositCalculator(root, currentMap!);
  });
  const defaultType = configurations[0].name;
  attachPeriods(root, defaultType, nameToMap);
}

function attachPeriods(
  root: HTMLElement,
  depositType: string,
  nameToMap: Map<string, Map<number, number>>
) {
  const currentMounthToPercentMap = nameToMap.get(depositType)!;
  const periodSelector = root?.querySelector<HTMLSelectElement>(
    'select#deposit-period'
  )!;
  periodSelector.innerHTML = '';
  periodSelector?.append(
    ...Array.from(currentMounthToPercentMap.entries()).map(
      ([period, percent]) => {
        const option = document.createElement('option');
        option.value = period.toString();
        option.innerText = `${period} мес. / ${percent * 100} %`;
        return option;
      }
    )
  );
  attachDepositCalculator(root, currentMounthToPercentMap);
}

function attachDepositCalculator(
  root: HTMLElement,
  currentMounthToPeriodMap: Map<number, number>
) {
  const period = Number(
    root.querySelector<HTMLSelectElement>('select#deposit-period')!.value
  );
  const depositRunBtn = root?.querySelector<HTMLButtonElement>(
    'button.deposit-run-btn'
  );
  depositRunBtn?.addEventListener('click', e => {
    e.preventDefault();
    const depositCalculator = new DepositCalculator(currentMounthToPeriodMap);
    const depositInput = root.querySelector<HTMLInputElement>(
      'input#deposit-amount'
    );
    const deposit = Number(depositInput?.value);
    const result = depositCalculator.calculateDeposit(deposit, period);
    const resultElement = root?.querySelector<HTMLElement>('.deposit-output')!;
    const depositFomatter = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUR',
    });
    resultElement.innerText = '';
    resultElement.innerText = `Вклад: ${deposit}, процент: ${
      currentMounthToPeriodMap.get(period)! * 100
    } %, итого: ${depositFomatter.format(result)}`;
  });
}
