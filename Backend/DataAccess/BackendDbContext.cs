using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DataAccess
{
    public class BackendDbContext : DbContext
    {
        public BackendDbContext(DbContextOptions<BackendDbContext> options) : base(options){ }

        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseInstance> CourseInstances { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>()
                .HasKey(c => c.Code);

            modelBuilder.Entity<CourseInstance>().HasOne(e => e.Course).WithMany(e => e.CourseInstances);
        }


    }
}
