import { Company } from '@/types/company';
import { CompanyType } from '@/types/companyType';
import { BASE_URL } from '../../constants';

export interface ICompanyService {
  getCompanies(): Promise<Company[]>;
  getCompany(id: number): Promise<Company>;
  createCompany(company: Company): Promise<void>;
  updateCompany(company: Company): Promise<void>;
  deleteCompany(id: number): Promise<void>;
  getCompanyTypes(): Promise<CompanyType[]>;
}

export class CompanyService implements ICompanyService {
  public async getCompanies(): Promise<Company[]> {
    const response = await fetch(`${BASE_URL}/api/Companies`);
    return await response.json();
  }

  public async getCompany(id: number): Promise<Company> {
    const response = await fetch(`${BASE_URL}/api/Companies/${id}`);
    return await response.json();
  }

  public async createCompany(company: Company): Promise<void> {
    await fetch(`${BASE_URL}/api/Companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(company),
    });
  }

  public async updateCompany(company: Company): Promise<void> {
    await fetch(`${BASE_URL}/api/Companies/${company.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(company),
    });
  }

  public async deleteCompany(id: number): Promise<void> {
    await fetch(`${BASE_URL}/api/Companies/${id}`, {
      method: 'DELETE',
    });
  }

  public async getCompanyTypes(): Promise<CompanyType[]> {
    const response = await fetch(`${BASE_URL}/api/CompanyTypes`);
    return await response.json();
  }
}
