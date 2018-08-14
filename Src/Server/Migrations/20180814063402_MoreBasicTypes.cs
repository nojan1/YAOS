using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class MoreBasicTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Checkpoints",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StageID = table.Column<int>(nullable: false),
                    Code = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Checkpoints", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Checkpoints_Stages_StageID",
                        column: x => x.StageID,
                        principalTable: "Stages",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Maps",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StageID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maps", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Maps_Stages_StageID",
                        column: x => x.StageID,
                        principalTable: "Stages",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Runners",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BadgeID = table.Column<int>(nullable: true),
                    ClassID = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Runners", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Runners_Badges_BadgeID",
                        column: x => x.BadgeID,
                        principalTable: "Badges",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Runners_Classes_ClassID",
                        column: x => x.ClassID,
                        principalTable: "Classes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OrderedCheckpoint",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CheckpointID = table.Column<int>(nullable: false),
                    MapID = table.Column<int>(nullable: false),
                    Order = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderedCheckpoint", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OrderedCheckpoint_Maps_MapID",
                        column: x => x.MapID,
                        principalTable: "Maps",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StartSlots",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StageÍD = table.Column<int>(nullable: false),
                    RunnerID = table.Column<int>(nullable: true),
                    MinuteOffset = table.Column<int>(nullable: false),
                    StageID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StartSlots", x => x.ID);
                    table.ForeignKey(
                        name: "FK_StartSlots_Runners_RunnerID",
                        column: x => x.RunnerID,
                        principalTable: "Runners",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StartSlots_Stages_StageID",
                        column: x => x.StageID,
                        principalTable: "Stages",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Badges_StageID",
                table: "Badges",
                column: "StageID");

            migrationBuilder.CreateIndex(
                name: "IX_Checkpoints_StageID",
                table: "Checkpoints",
                column: "StageID");

            migrationBuilder.CreateIndex(
                name: "IX_Maps_StageID",
                table: "Maps",
                column: "StageID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderedCheckpoint_MapID",
                table: "OrderedCheckpoint",
                column: "MapID");

            migrationBuilder.CreateIndex(
                name: "IX_Runners_BadgeID",
                table: "Runners",
                column: "BadgeID");

            migrationBuilder.CreateIndex(
                name: "IX_Runners_ClassID",
                table: "Runners",
                column: "ClassID");

            migrationBuilder.CreateIndex(
                name: "IX_StartSlots_RunnerID",
                table: "StartSlots",
                column: "RunnerID");

            migrationBuilder.CreateIndex(
                name: "IX_StartSlots_StageID",
                table: "StartSlots",
                column: "StageID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Checkpoints");

            migrationBuilder.DropTable(
                name: "OrderedCheckpoint");

            migrationBuilder.DropTable(
                name: "StartSlots");

            migrationBuilder.DropTable(
                name: "Maps");

            migrationBuilder.DropTable(
                name: "Runners");

            migrationBuilder.DropIndex(
                name: "IX_Badges_StageID",
                table: "Badges");

        }
    }
}
