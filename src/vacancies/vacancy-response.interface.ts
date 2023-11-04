export interface IVacancyResponse {
  id: string;
  premium: boolean;
  has_test: boolean;
  response_url: any;
  address: any;
  alternate_url: string;
  apply_alternate_url: string;
  department: IDepartment;
  salary: ISalary | null;
  name: string;
  insider_interview: InsiderInterview;
  area: IArea;
  url: string;
  published_at: string;
  relations: any[];
  employer: Employer;
  response_letter_required: boolean;
  type: IType;
  archived: string;
  working_days: IWorkingDay[];
  working_time_intervals: IWorkingTimeInterval[];
  working_time_modes: IWorkingTimeMode[];
  accept_temporary: boolean;
  experience: IExperience;
  employment: IEmployment;
  show_logo_in_search: boolean;
}

export interface IDepartment {
  id: string;
  name: string;
}

export interface ISalary {
  to: number | null;
  from: number | null;
  currency: string;
  gross: boolean;
}

export interface InsiderInterview {
  id: string;
  url: string;
}

export interface IArea {
  url: string;
  id: string;
  name: string;
}

export interface Employer {
  url: string;
  alternate_url: string;
  logo_urls?: LogoUrls;
  name: string;
  id: string;
}

export interface LogoUrls {
  '90': string;
  '240': string;
  original: string;
}

export interface IType {
  id: string;
  name: string;
}

export interface IWorkingDay {
  id: string;
  name: string;
}

export interface IWorkingTimeInterval {
  id: string;
  name: string;
}

export interface IWorkingTimeMode {
  id: string;
  name: string;
}

export interface IExperience {
  id: string;
  name: string;
}

export interface IEmployment {
  id: string;
  name: string;
}
