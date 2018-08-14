using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Entities
{
    public class Class
    {
        public int ID { get; set; }
        public int StageID { get; set; }

        public string Name { get; set; }
        public bool AllowBadgeStart { get; set; }
        public int VacancyPercentage { get; set; }
        public int TimeSpacing { get; set; }
        public bool HasStartTime { get; set; }

        public Stage Stage { get; set; }
    }
}
