using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Course
    {
        public string Title { get; set; }
        public string Code { get; set; }
        public string Duration { get; set; }
        public List<CourseInstance> CourseInstances { get; set; }
    }
}
