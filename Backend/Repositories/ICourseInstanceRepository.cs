using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public interface ICourseInstanceRepository
    {
        Task<List<CourseInstance>> GetCourseInstancesAsync();
        Task<CourseInstance> GetCourseInstanceByIdAsync(int id);
        Task<ViewModelCourse> CreateCourseInstanceAsync(CourseInstance[] course);
        Task UpdateCourseInstanceAsync(CourseInstance course);
        Task DeleteCourseInstanceAsync(CourseInstance course);
    }
}
