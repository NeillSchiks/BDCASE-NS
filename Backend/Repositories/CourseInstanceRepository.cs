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

        public async Task<ViewModelCourse> CreateCourseInstanceAsync(CourseInstance[] course)
        {
            ViewModelCourse viewModel = new ViewModelCourse()
            {
                CoursesAdded = 0,
                CourseInstancesAdded = 0,
                CourseInstanceDuplicates = 0,
            };

            foreach(var item in course)
            {
                var result = await context.Courses.FindAsync(item.Course.Code);
                if (result == null)
                {
                    await context.CourseInstances.AddAsync(item);
                    await context.SaveChangesAsync();
                    viewModel.CoursesAdded++;
                    viewModel.CourseInstancesAdded++;
                }
                else
                {
                    CourseInstance courseInstance = new CourseInstance()
                    {
                        StartDate = item.StartDate,
                        CourseCode = item.Course.Code
                    };
                    var duplicate = context.CourseInstances.Where(x => (x.StartDate == courseInstance.StartDate && x.CourseCode == courseInstance.CourseCode)).FirstOrDefault();
                    if (duplicate == null)
                    {
                        await context.CourseInstances.AddAsync(courseInstance);
                        await context.SaveChangesAsync();
                        viewModel.CourseInstancesAdded++;
                    }
                    else
                    {
                        viewModel.CourseInstanceDuplicates++;
                    }
                }
            }

            return viewModel;
        }

        public async Task<CourseInstance> GetCourseInstanceByIdAsync(int id)
        {
            var result = await context.CourseInstances.FindAsync(id);
            var courseInstance = context.CourseInstances.Where(c => c.Id == result.Id).Include(a => a.Course);
            return (CourseInstance)courseInstance;
        }

        public async Task<List<CourseInstance>> GetCourseInstancesAsync()
        {
            return await context.CourseInstances.Include(a => a.Course).OrderBy(x => x.StartDate).ToListAsync();
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
