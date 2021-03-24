using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class ViewModelCourse
    {
        public int CoursesAdded { get; set; }
        public int CourseInstancesAdded { get; set; }
        public int CourseInstanceDuplicates { get; set; }
    }
}
