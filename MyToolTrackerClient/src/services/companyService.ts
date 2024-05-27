import { Company } from "@/types/company";
import { CompanyType } from "@/types/companyType";
import api from "@/config/axios";

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
    const response = await api.get("/api/Companies");
    return response.data;
  }

  public async getCompany(id: number): Promise<Company> {
    const response = await api.get(`/api/Companies/${id}`);
    return response.data;
  }

  public async createCompany(company: Company): Promise<void> {
    await api.post("/api/Companies", company);
  }

  public async updateCompany(company: Company): Promise<void> {
    await api.put(`/api/Companies/${company.id}`, company);
  }

  public async deleteCompany(id: number): Promise<void> {
    await api.delete(`/api/Companies/${id}`);
  }

  public async getCompanyTypes(): Promise<CompanyType[]> {
    const response = await api.get("/api/CompanyTypes");
    return response.data;
  }
}
