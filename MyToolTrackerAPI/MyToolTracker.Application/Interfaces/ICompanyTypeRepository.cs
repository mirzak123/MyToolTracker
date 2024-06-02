using MyToolTrackerAPI.Domain.Models;

namespace MyToolTrackerAPI.Application.Interfaces
{
	public interface ICompanyTypeRepository
	{
		ICollection<CompanyType> GetCompanyTypes();
		CompanyType GetCompanyType(int id);
		CompanyType GetCompanyType(string name);
		bool CompanyTypeExists(int id);
	}
}

