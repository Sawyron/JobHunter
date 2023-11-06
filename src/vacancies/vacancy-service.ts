import axios from 'axios';
import { IVacancyResponse } from './vacancy-response.interface.js';

export class VacancyService {
  private static baseUrl = 'https://api.hh.ru';

  public async getVacancies(text?: string): Promise<IVacancyResponse[]> {
    const response = await axios.get<{ items: IVacancyResponse[] }>(
      `vacancies`,
      {
        baseURL: VacancyService.baseUrl,
        params: { text: text },
      }
    );
    return response.data.items;
  }
}
