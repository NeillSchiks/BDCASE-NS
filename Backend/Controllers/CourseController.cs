using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseRepository courseRepository;

        public CourseController(ICourseRepository courseRepository)
        {
            this.courseRepository = courseRepository;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Course>>> GetCourses()
        {
            return await courseRepository.GetCoursesAsync();
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            return await courseRepository.GetCourseByIdAsync(id);
        }

        [HttpPost]
        [Route("")]
        public async Task CreateCourse(Course course)
        {
            await courseRepository.CreateCourseAsync(course);
        }

        [HttpPut]
        [Route("")]
        public async Task UpdateCourse(Course course)
        {
            await courseRepository.UpdateCourseAsync(course);
        }

        [HttpDelete]
        [Route("")]
        public async Task DeleteCourse(int id)
        {
            var course = await courseRepository.GetCourseByIdAsync(id);
            await courseRepository.DeleteCourseAsync(course);
        }
    }
}
