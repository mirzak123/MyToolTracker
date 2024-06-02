using MyToolTrackerAPI.Domain.Models;

namespace MyToolTrackerAPI.Application.Interfaces
{
	public interface ICompanyRepository
	{
		ICollection<Company> GetCompanies();
		Company GetCompany(int id);
		Company GetCompany(string name);
		bool CompanyExists(int id);
        bool CreateCompany(Company company);
		bool UpdateCompany(Company company);
		bool DeleteCompany(Company company);
        bool Save();
    }
}

