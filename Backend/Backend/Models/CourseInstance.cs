using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class CourseInstance
    {
        public int Id { get; set; }

        public DateTime StartDate { get; set; }

        public Course Course { get; set; }
    }
}
