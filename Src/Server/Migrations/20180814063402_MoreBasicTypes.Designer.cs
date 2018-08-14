﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Entities;

namespace Server.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20180814063402_MoreBasicTypes")]
    partial class MoreBasicTypes
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.1-rtm-30846");

            modelBuilder.Entity("Server.Entities.Badge", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("StageID");

                    b.HasKey("ID");

                    b.HasIndex("StageID");

                    b.ToTable("Badges");
                });

            modelBuilder.Entity("Server.Entities.Checkpoint", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Code");

                    b.Property<int>("StageID");

                    b.HasKey("ID");

                    b.HasIndex("StageID");

                    b.ToTable("Checkpoints");
                });

            modelBuilder.Entity("Server.Entities.Class", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int>("StageID");

                    b.HasKey("ID");

                    b.HasIndex("StageID");

                    b.ToTable("Classes");
                });

            modelBuilder.Entity("Server.Entities.Competition", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.ToTable("Competitions");
                });

            modelBuilder.Entity("Server.Entities.Map", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("StageID");

                    b.HasKey("ID");

                    b.HasIndex("StageID");

                    b.ToTable("Maps");
                });

            modelBuilder.Entity("Server.Entities.OrderedCheckpoint", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CheckpointID");

                    b.Property<int>("MapID");

                    b.Property<int>("Order");

                    b.HasKey("ID");

                    b.HasIndex("MapID");

                    b.ToTable("OrderedCheckpoint");
                });

            modelBuilder.Entity("Server.Entities.Punch", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BadgeID");

                    b.Property<int>("StationCode");

                    b.Property<DateTime>("Timestamp");

                    b.HasKey("ID");

                    b.HasIndex("BadgeID");

                    b.ToTable("Punches");
                });

            modelBuilder.Entity("Server.Entities.Runner", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("BadgeID");

                    b.Property<int?>("ClassID");

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.HasIndex("BadgeID");

                    b.HasIndex("ClassID");

                    b.ToTable("Runners");
                });

            modelBuilder.Entity("Server.Entities.Stage", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CompetitionID");

                    b.HasKey("ID");

                    b.HasIndex("CompetitionID");

                    b.ToTable("Stages");
                });

            modelBuilder.Entity("Server.Entities.StartSlot", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("MinuteOffset");

                    b.Property<int?>("RunnerID");

                    b.Property<int?>("StageID");

                    b.Property<int>("StageÍD");

                    b.HasKey("ID");

                    b.HasIndex("RunnerID");

                    b.HasIndex("StageID");

                    b.ToTable("StartSlots");
                });

            modelBuilder.Entity("Server.Entities.Badge", b =>
                {
                    b.HasOne("Server.Entities.Stage", "Stage")
                        .WithMany("Badges")
                        .HasForeignKey("StageID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Server.Entities.Checkpoint", b =>
                {
                    b.HasOne("Server.Entities.Stage", "Stage")
                        .WithMany("Checkpoints")
                        .HasForeignKey("StageID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Server.Entities.Class", b =>
                {
                    b.HasOne("Server.Entities.Stage", "Stage")
                        .WithMany("Classes")
                        .HasForeignKey("StageID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Server.Entities.Map", b =>
                {
                    b.HasOne("Server.Entities.Stage", "Stage")
                        .WithMany("Maps")
                        .HasForeignKey("StageID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Server.Entities.OrderedCheckpoint", b =>
                {
                    b.HasOne("Server.Entities.Map")
                        .WithMany("Checkpoints")
                        .HasForeignKey("MapID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Server.Entities.Punch", b =>
                {
                    b.HasOne("Server.Entities.Badge", "Badge")
                        .WithMany("Punches")
                        .HasForeignKey("BadgeID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Server.Entities.Runner", b =>
                {
                    b.HasOne("Server.Entities.Badge", "Badge")
                        .WithMany()
                        .HasForeignKey("BadgeID");

                    b.HasOne("Server.Entities.Class", "Class")
                        .WithMany()
                        .HasForeignKey("ClassID");
                });

            modelBuilder.Entity("Server.Entities.Stage", b =>
                {
                    b.HasOne("Server.Entities.Competition", "Competition")
                        .WithMany("Stages")
                        .HasForeignKey("CompetitionID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Server.Entities.StartSlot", b =>
                {
                    b.HasOne("Server.Entities.Runner", "Runner")
                        .WithMany()
                        .HasForeignKey("RunnerID");

                    b.HasOne("Server.Entities.Stage", "Stage")
                        .WithMany()
                        .HasForeignKey("StageID");
                });
#pragma warning restore 612, 618
        }
    }
}
