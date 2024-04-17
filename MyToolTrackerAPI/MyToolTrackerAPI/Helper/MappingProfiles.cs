using System;
using AutoMapper;
using MyToolTrackerAPI.Dto;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Helper
{
	public class MappingProfiles : Profile
	{
		public MappingProfiles()
		{
			CreateMap<Category, CategoryDto>();
			CreateMap<Company, CompanyDto>();
			CreateMap<CompanyType, CompanyTypeDto>();
			CreateMap<Employee, EmployeeDto>();
			CreateMap<EmployeeType, EmployeeTypeDto>();
			CreateMap<OrderRequest, OrderRequestDto>();
            CreateMap<Project, ProjectDto>();
			CreateMap<Tool, ToolDto>();
			CreateMap<ToolStatus, ToolStatusDto>();
			CreateMap<UserRole, UserRoleDto>();

            CreateMap<CategoryDto, Category>();
            CreateMap<CompanyDto, Company>();
			CreateMap<EmployeeDto, Employee>();
			CreateMap<OrderRequestDto, OrderRequest>();
			CreateMap<ProjectDto, Project>();
			CreateMap<ToolDto, Tool>();

        }
    }
}

