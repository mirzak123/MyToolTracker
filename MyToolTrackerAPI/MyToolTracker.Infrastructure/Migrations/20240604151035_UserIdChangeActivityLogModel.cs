using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyToolTrackerAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UserIdChangeActivityLogModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "ActivityLogs",
                newName: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ActivityLogs",
                newName: "UserName");
        }
    }
}
