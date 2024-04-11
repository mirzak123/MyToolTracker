using MyToolTrackerAPI.Data;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI
{
    public class Seed
    {
        private readonly DataContext dataContext;
        public Seed(DataContext context)
        {
            dataContext = context;
        }
        public void SeedDataContext()
        {
            if (!dataContext.Employees.Any())
            {
                var companyTypes = new List<CompanyType>()
                {
                    new CompanyType()
                    {
                        Name = "Client",
                    },
                    new CompanyType()
                    {
                        Name = "Supplier",
                    },
                    new CompanyType()
                    {
                        Name = "Partner",
                    },
                };

                var employeeTypes = new List<EmployeeType>()
                {
                    new EmployeeType()
                    {
                        Name = "Full-time",
                    },
                    new EmployeeType()
                    {
                        Name = "Part-time",
                    },
                    new EmployeeType()
                    {
                        Name = "Contract",
                    },
                };

                var toolStatuses = new List<ToolStatus>()
                {
                    new ToolStatus()
                    {
                        Name = "Available",
                    },
                    new ToolStatus()
                    {
                        Name = "Reserved",
                    },
                    new ToolStatus()
                    {
                        Name = "Broken",
                    },
                    new ToolStatus()
                    {
                        Name = "Lost",
                    },
                };

                var employees = new List<Employee>()
                {
                  new Employee()
                  {
                      LastName = "Karic",
                      FirstName = "Mirza",
                      Jmbg = "1234567890123",
                      IdCardNumber = "123456789",
                      ContactNumber = "123456789",
                      EmployeeType = employeeTypes[0],
                  },
                  new Employee()
                  {
                      LastName = "Maksumic",
                      FirstName = "Mirza",
                      Jmbg = "1234567890124",
                      IdCardNumber = "123456788",
                      ContactNumber = "123456788",
                      EmployeeType = employeeTypes[1],
                  },
                  new Employee()
                  {
                      LastName = "Husanovic",
                      FirstName = "Armin",
                      Jmbg = "1234567890125",
                      IdCardNumber = "123456787",
                      ContactNumber = "123456787",
                      EmployeeType = employeeTypes[2],
                  },
                  new Employee()
                  {
                      LastName = "Stark",
                      FirstName = "Arya",
                      Jmbg = "1234567890126",
                      IdCardNumber = "123456786",
                      ContactNumber = "123456786",
                      EmployeeType = employeeTypes[0],
                  },
                  new Employee()
                  {
                      LastName = "Targaryen",
                      FirstName = "Daenerys",
                      Jmbg = "1234567890127",
                      IdCardNumber = "123456785",
                      ContactNumber = "123456785",
                      EmployeeType = employeeTypes[0],
                  },
                  new Employee()
                  {
                      LastName = "Melisandre",
                      FirstName = "",
                      Jmbg = "1234567890128",
                      IdCardNumber = "123456784",
                      ContactNumber = "123456784",
                      EmployeeType = employeeTypes[2],
                  },
                  new Employee()
                  {
                      LastName = "Clifford",
                      FirstName = "Ferrara",
                      Jmbg = "1234567890129",
                      IdCardNumber = "123456783",
                      ContactNumber = "123456783",
                      EmployeeType = employeeTypes[2],
                  },
                  new Employee()
                  {
                      LastName = "Frances",
                      FirstName = "Rossini",
                      Jmbg = "1234567890130",
                      IdCardNumber = "123456782",
                      ContactNumber = "123456782",
                      EmployeeType = employeeTypes[1],
                  },
                  new Employee()
                  {
                      LastName = "Roxie",
                      FirstName = "Harvey",
                      Jmbg = "1234567890131",
                      IdCardNumber = "123456781",
                      ContactNumber = "123456781",
                      EmployeeType = employeeTypes[0],
                  }
                };

                var categories = new List<Category>()
                {
                    new Category()
                    {
                        Name = "Hammers"
                    },
                    new Category()
                    {
                        Name = "Drills"
                    },
                    new Category()
                    {
                        Name = "Screwdrivers"
                    },
                };

                var orderRequests = new List<OrderRequest>()
                {
                  new OrderRequest()
                  {
                       StartDate = new DateOnly(2023, 4, 12),
                       EndDate = new DateOnly(2023, 4, 12),
                       Employee = employees[0],
                       Tool = new Tool()
                       {
                         Name = "Hammer",
                         Model = "Hammer 1",
                         Manufacturer = "Hammer Manufacturer",
                         Price = 10,
                         Barcode = "1234567890123",
                         Category = categories[0],
                         EntryDate = new DateTime(2023, 4, 12),
                         ToolStatus = toolStatuses[1],
                       },
                       Project = new Project()
                       {
                         ContractNumber = "1234567890123",
                         Year = 2023,
                         Company = new Company()
                         {
                           Name = "Company 1",
                           Address = "Company 1 Address",
                           PhoneNumber = "061324876",
                           Email = "company@email.com",
                           ContactPerson = "Company 1 Contact Person",
                           ContactPersonPhoneNumber = "061324876",
                           CompanyType = companyTypes[2],
                         },
                       },
                  },
                  new OrderRequest()
                  {
                       StartDate = new DateOnly(2023, 4, 12),
                       EndDate = new DateOnly(2023, 4, 12),
                       Employee = employees[1],
                       Tool = new Tool()
                       {
                         Name = "Screwdriver",
                         Model = "Screwdriver 1",
                         Manufacturer = "Screwdriver Manufacturer",
                         Price = 5,
                         Barcode = "1234567890124",
                         EntryDate = new DateTime(2023, 4, 12),
                         Category = categories[2],
                         ToolStatus = toolStatuses[1],
                       },
                       Project = new Project()
                       {
                         ContractNumber = "1234567890124",
                         Year = 2023,
                         Company = new Company()
                         {
                           Name = "Company 2",
                           Address = "Company 2 Address",
                           PhoneNumber = "061324876",
                           Email = "company2@email.com",
                           ContactPerson = "Company 2 Contact Person",
                           ContactPersonPhoneNumber = "061324876",
                           CompanyType = companyTypes[0],
                         },
                       },
                  },
            };
                dataContext.CompanyTypes.AddRange(companyTypes);
                dataContext.EmployeeTypes.AddRange(employeeTypes);
                dataContext.ToolStatuses.AddRange(toolStatuses);
                dataContext.Employees.AddRange(employees);
                dataContext.Categories.AddRange(categories);
                dataContext.OrderRequests.AddRange(orderRequests);
                dataContext.SaveChanges();
            }
        }
    }
}
