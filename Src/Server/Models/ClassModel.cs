using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class ClassModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class ClassWithPropertiesModel : ClassModel
    {
        public bool AllowBadgeStart { get; set; } = true;
        public int VacancyPercentage { get; set; } = 20;
        public int TimeSpacing { get; set; } = 2;
        public bool HasStartTime { get; set; } = true;
    }
}
