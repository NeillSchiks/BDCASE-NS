using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public interface ICourseRepository
    {
        Task<List<Course>> GetCoursesAsync();
        Task<Course> GetCourseByIdAsync(int id);
        Task CreateCourseAsync(Course course);
        Task UpdateCourseAsync(Course course);
        Task DeleteCourseAsync(Course course);
    }
}
