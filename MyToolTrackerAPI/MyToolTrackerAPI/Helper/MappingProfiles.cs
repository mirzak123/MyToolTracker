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
			CreateMap<Company, CompanyDto>();
			CreateMap<Employee, EmployeeDto>();
			CreateMap<Project, ProjectDto>();
			CreateMap<Tool, ToolDto>();
		}
	}
}

