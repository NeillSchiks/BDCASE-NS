using Backend.Controllers;
using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Backend.xUnitTests
{
    public class CourseInstanceControllerTests
    {
        CourseInstanceController sut;
        Mock<ICourseInstanceRepository> mockCourseInstanceRepo;

        public CourseInstanceControllerTests()
        {
            List<CourseInstance> courseInstances = new List<CourseInstance>
            {
                new CourseInstance { StartDate = DateTime.Parse("2021-03-23") , CourseCode = "BLZ"},
                new CourseInstance { StartDate = DateTime.Parse("2021-03-24") , CourseCode = "CNETIN"},
                new CourseInstance { StartDate = DateTime.Parse("2021-03-29") , CourseCode = "CNETIN"},
            };

            mockCourseInstanceRepo = new Mock<ICourseInstanceRepository>();
            mockCourseInstanceRepo.Setup(repo => repo.GetCourseInstancesAsync())
                .Returns(Task.FromResult(courseInstances));

            sut = new CourseInstanceController(mockCourseInstanceRepo.Object);
        }

        [Fact]
        public void GetCourseInstances_should_return_all_instances()
        {
            //Arrange --> in de constructor
            //Act
            var result = sut.GetCourseInstances();
            //Assert
            Assert.Equal(3, result.Result.Value.Count());
        }

        [Fact]
        public void GetCourseInstances_should_return_actionresult_list_courseinstances()
        {
            //Arrange --> in de constructor
            //Act
            var result = sut.GetCourseInstances();
            //Assert
            Assert.IsType<ActionResult<List<CourseInstance>>>(result.Result);
        }

        [Fact]
        public void CreateCourseInstance_new_instance_and_new_course_should_add_new_instance_and_new_course()
        {
            //Arrange
            ViewModelCourse viewModel = new ViewModelCourse() { CoursesAdded = 1, CourseInstancesAdded = 1, CourseInstanceDuplicates = 0 };
            CourseInstance[] courseAngular = new CourseInstance[] { new CourseInstance { StartDate = DateTime.Parse("2021-04-23"), Course = new Course { Title = "Angular", Duration = "4 dagen", Code = "ANGU" } } };

            mockCourseInstanceRepo.Setup(repo => repo.CreateCourseInstanceAsync(It.IsAny<CourseInstance[]>()))
                .Returns(Task.FromResult(viewModel));

            sut = new CourseInstanceController(mockCourseInstanceRepo.Object);

            //Act
            var result = sut.CreateCourseInstance(courseAngular);
            //Assert
            Assert.IsType<ActionResult<ViewModelCourse>>(result.Result);
            Assert.Equal(1, result.Result.Value.CoursesAdded);
            Assert.Equal(1, result.Result.Value.CourseInstancesAdded);
            Assert.Equal(0, result.Result.Value.CourseInstanceDuplicates);
        }

        [Fact]
        public void CreateCourseInstance_should_create_only_new_instance()
        {
            //Arrange
            ViewModelCourse viewModel = new ViewModelCourse() { CoursesAdded = 0, CourseInstancesAdded = 1, CourseInstanceDuplicates = 3 };
            CourseInstance[] courseBlazor = new CourseInstance[] { new CourseInstance { StartDate = DateTime.Parse("2021-04-15"), Course = new Course { Title = "Blazor", Duration = "4 dagen", Code = "BLZ" } } };

            mockCourseInstanceRepo.Setup(repo => repo.CreateCourseInstanceAsync(It.IsAny<CourseInstance[]>()))
                .Returns(Task.FromResult(viewModel));

            sut = new CourseInstanceController(mockCourseInstanceRepo.Object);

            //Act
            var result = sut.CreateCourseInstance(courseBlazor);
            //Assert
            Assert.IsType<ActionResult<ViewModelCourse>>(result.Result);
            Assert.Equal(0, result.Result.Value.CoursesAdded);
            Assert.Equal(1, result.Result.Value.CourseInstancesAdded);
            Assert.Equal(3, result.Result.Value.CourseInstanceDuplicates);
        }
    }
}
