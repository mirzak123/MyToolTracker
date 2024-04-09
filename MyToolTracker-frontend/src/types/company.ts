import { CompanyType } from './companyType';

export interface Company {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
  contactPerson: string;
  contactPersonPhoneNumber: string;
  email: string;
  type: CompanyType;
}
