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
    [Route("api/[controller]")]
    [ApiController]
    public class CourseInstanceController : ControllerBase
    {
        private readonly ICourseInstanceRepository courseInstanceRepository;

        public CourseInstanceController(ICourseInstanceRepository courseInstanceRepository)
        {
            this.courseInstanceRepository = courseInstanceRepository;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<CourseInstance>>> GetCourseInstances()
        {
            return await courseInstanceRepository.GetCourseInstancesAsync();
        }

        //[HttpGet]
        //[Route("{id:int}")]
        //public async Task<ActionResult<CourseInstance>> GetCourseInstance(int id)
        //{
        //    return await courseInstanceRepository.GetCourseInstanceByIdAsync(id);
        //}

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<ViewModelCourse>> CreateCourseInstance(CourseInstance[] courseInstance)
        {
            return await courseInstanceRepository.CreateCourseInstanceAsync(courseInstance);
        }

        //[HttpPut]
        //[Route("")]
        //public async Task UpdateCourseInstance(CourseInstance courseInstance)
        //{
        //    await courseInstanceRepository.UpdateCourseInstanceAsync(courseInstance);
        //}

        //[HttpDelete]
        //[Route("")]
        //public async Task DeleteCourseInstance(int id)
        //{
        //    var courseInstance = await courseInstanceRepository.GetCourseInstanceByIdAsync(id);
        //    await courseInstanceRepository.DeleteCourseInstanceAsync(courseInstance);
        //}
    }
}
