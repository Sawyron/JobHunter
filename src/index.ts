import '../public/styles.css';
import { swiper } from './swiper-init.js';
import { VacancyService } from './vacancies/vacancy-service.js';
import imageLogo from '../public/images/job_log.png';

const service = new VacancyService();
const vacancies = await service.getVacancies();
const vacancyHtmlElements = vacancies
  .map(vacancy => {
    let salaryString = 'Не указано';
    if (vacancy.salary) {
      const currencyFormatter = Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: vacancy.salary.currency,
      });
      const { from, to } = vacancy.salary;
      const toSalaryString = to ? ` - ${currencyFormatter.format(to)}` : '';
      if (from) {
        salaryString = `${currencyFormatter.format(from)}${toSalaryString}`;
      }
    }
    const nameElement = document.createElement('p');
    nameElement.textContent = `Название: ${vacancy.name}`;
    const salaryElement = document.createElement('p');
    salaryElement.textContent = `Зарплата: ${salaryString}`;
    const employerElement = document.createElement('p');
    employerElement.textContent = `Работадатель: ${vacancy.employer.name}`;
    const logoElement = new Image();
    logoElement.setAttribute('alt', 'employer_logo');
    logoElement.classList.add('emloyer-logo');
    if (vacancy.employer.logo_urls) {
      logoElement.src = vacancy.employer.logo_urls.original;
    } else {
      logoElement.src = imageLogo;
    }
    const resultElement = document.createElement('div');
    resultElement.classList.add('swiper-content');
    const urlElement = document.createElement('a');
    urlElement.setAttribute('href', vacancy.alternate_url);
    urlElement.textContent = 'Перейти';
    resultElement.append(
      nameElement,
      salaryElement,
      employerElement,
      urlElement,
      logoElement
    );
    return resultElement;
  })
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
