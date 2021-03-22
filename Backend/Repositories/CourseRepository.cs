using Backend.DataAccess;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly BackendDbContext context;

        public CourseRepository(BackendDbContext context)
        {
            this.context = context;
        }

        public async Task CreateCourseAsync(Course course)
        {
            context.Courses.Add(course);
            await context.SaveChangesAsync();
        }

        public async Task<Course> GetCourseByIdAsync(int id)
        {
            return await context.Courses.FindAsync(id);
        }

        public async Task<List<Course>> GetCoursesAsync()
        {
            return await context.Courses.ToListAsync();
        }

        public async Task UpdateCourseAsync(Course course)
        {
            context.Entry(course).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public async Task DeleteCourseAsync(Course course)
        {
            context.Courses.Remove(course);
            await context.SaveChangesAsync();
        }
    }
}
