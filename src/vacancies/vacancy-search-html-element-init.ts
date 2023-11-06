import { VacancyService } from './vacancy-service.js';
import { swiper } from '../swiper-init.js';
import { mapVacancyToHTMLDivElement } from './vacancy-html-element-mapper.js';

export function initializeVacancySearch() {
  const root = document.querySelector<HTMLFormElement>('form.search-vacancy')!;
  const vacancyService = new VacancyService();
  root.addEventListener('submit', e => {
    e.preventDefault();
    loadVacancies(vacancyService, root);
  });
  loadVacancies(vacancyService, root);
}

async function loadVacancies(
  vacancyService: VacancyService,
  root: HTMLElement
) {
  const vacancyTextInput = root.querySelector<HTMLInputElement>(
    'input#search-vacancy-input'
  )!;
  const vacancyText = vacancyTextInput.value.trim();
  const vacancies = await vacancyService.getVacancies(vacancyText);
  const vacancyHtmlElements = vacancies
    .map(vacancy => mapVacancyToHTMLDivElement(vacancy))
    .map(element => {
      const slideElement = document.createElement('div');
      slideElement.classList.add('swiper-slide');
      slideElement.append(element);
      return slideElement;
    });
  swiper.removeAllSlides();
  swiper.appendSlide(vacancyHtmlElements);
}
