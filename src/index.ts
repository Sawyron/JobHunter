import '../public/styles.css';
import { initializeDepositHtmlElement } from './deposit/deposit-html-element-factory.js';
import { initializeVacancySearch } from './vacancies/vacancy-search-html-element-init.js';

initializeVacancySearch();
initializeDepositHtmlElement([
  {
    name: 'Пополняемый',
    monthsToPercent: new Map([
      [6, 0.2],
      [12, 0.22],
      [18, 0.15],
      [36, 0.1],
    ]),
  },
  {
    name: 'Срочный',
    monthsToPercent: new Map([
      [3, 0.2],
      [6, 0.22],
    ]),
  },
]);
