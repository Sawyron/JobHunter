import '../public/styles.css';
import { swiper } from './swiper-init.js';
import { VacancyService } from './vacancies/vacancy-service.js';
import { mapVacancyToHTMLDivElement } from './vacancies/vacancy-html-element-mapper.js';

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

const rootElement = document.querySelector('.swiper-wrapper');
if (rootElement) {
  swiper.appendSlide(vacancyHtmlElements);
}
