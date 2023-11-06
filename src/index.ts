import '../public/styles.css';
import { swiper } from './swiper-init.js';
import { VacancyService } from './vacancies/vacancy-service.js';
import { mapVacancyToHTMLDivElement } from './vacancies/vacancy-html-element-mapper.js';
import { initializeDepositHtmlElement } from './deposit/deposit-html-element-factory.js';

const service = new VacancyService();
const vacancies = await service.getVacancies();
const vacancyHtmlElements = vacancies
  .map(vacancy => mapVacancyToHTMLDivElement(vacancy))
  .map(element => {
    const slideElement = document.createElement('div');
    slideElement.classList.add('swiper-slide');
    slideElement.append(element);
    return slideElement;
  });

swiper.appendSlide(vacancyHtmlElements);
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
