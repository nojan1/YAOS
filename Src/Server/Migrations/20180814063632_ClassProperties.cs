using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class ClassProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AllowBadgeStart",
                table: "Classes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasStartTime",
                table: "Classes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "TimeSpacing",
                table: "Classes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "VacancyPercentage",
                table: "Classes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AllowBadgeStart",
                table: "Classes");

            migrationBuilder.DropColumn(
                name: "HasStartTime",
                table: "Classes");

            migrationBuilder.DropColumn(
                name: "TimeSpacing",
                table: "Classes");

            migrationBuilder.DropColumn(
                name: "VacancyPercentage",
                table: "Classes");
        }
    }
}
