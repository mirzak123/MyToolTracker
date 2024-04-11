using MyToolTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace MyToolTrackerAPI.Data
{
    public class DataContext : DbContext
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
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<EmployeeType> EmployeeTypes { get; set; }
        public DbSet<CompanyType> CompanyTypes { get; set; }
        public DbSet<ToolStatus> ToolStatuses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tool>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,4)"); // 18 digits and 4 decimal places
        }
    }
}
