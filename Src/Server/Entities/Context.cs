using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Entities
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> contextOptions)
            : base(contextOptions)
        {

        }

        public DbSet<Competition> Competitions { get; set; }
        public DbSet<Stage> Stages { get; set; }
        public DbSet<Punch> Punches { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Badge> Badges { get; set; }
    }
}
