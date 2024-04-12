using System;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Interfaces
{
	public interface ICompanyTypeRepository
	{
		ICollection<CompanyType> GetCompanyTypes();
		CompanyType GetCompanyType(int id);
		CompanyType GetCompanyType(string name);
		bool CompanyTypeExists(int id);
	}
}

