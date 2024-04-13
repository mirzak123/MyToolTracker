using System;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Interfaces
{
	public interface ICompanyRepository
	{
		ICollection<Company> GetCompanies();
		Company GetCompany(int id);
		Company GetCompany(string name);
		bool CompanyExists(int id);
        bool CreateCompany(Company company);
        bool Save();
    }
}

