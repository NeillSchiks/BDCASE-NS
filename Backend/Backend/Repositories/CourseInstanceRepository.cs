using Backend.DataAccess;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public class CourseInstanceRepository : ICourseInstanceRepository
    {
        private readonly BackendDbContext context;

        public CourseInstanceRepository (BackendDbContext context)
        {
            this.context = context;
        }

        public async Task CreateCourseInstanceAsync(CourseInstance course)
        {
            context.CourseInstances.Add(course);
            await context.SaveChangesAsync();
        }

        public async Task<CourseInstance> GetCourseInstanceByIdAsync(int id)
        {
            var result = await context.CourseInstances.FindAsync(id);
            var courseInstance = context.CourseInstances.Where(c => c.Id == result.Id).Include(a => a.Course);
            return (CourseInstance)courseInstance;
        }

        public async Task<List<CourseInstance>> GetCourseInstancesAsync()
        {
            return await context.CourseInstances.Include(a => a.Course).ToListAsync();
        }

        public async Task UpdateCourseInstanceAsync(CourseInstance course)
        {
            context.Entry(course).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public async Task DeleteCourseInstanceAsync(CourseInstance course)
        {
            context.CourseInstances.Remove(course);
            await context.SaveChangesAsync();
        }
    }
}
