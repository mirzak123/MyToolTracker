using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyToolTrackerAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangeActivityLogModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ActivityLogs");

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "ActivityLogs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "ActivityLogs");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "ActivityLogs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
