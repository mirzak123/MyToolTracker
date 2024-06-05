using MyToolTrackerAPI.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace MyToolTrackerAPI.Infrastructure.Data
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<OrderRequest> OrderRequests { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Tool> Tools { get; set; }
        public DbSet<EmployeeType> EmployeeTypes { get; set; }
        public DbSet<CompanyType> CompanyTypes { get; set; }
        public DbSet<ToolStatus> ToolStatuses { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }

        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Tool>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,4)"); // 18 digits and 4 decimal places
        }
    }
}
