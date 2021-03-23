using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class UpdateCourseInstance : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "CourseInstances");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "CourseInstances",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
