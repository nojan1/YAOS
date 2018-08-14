using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Entities
{
    public class Badge
    {
        public int ID { get; set; }
        public int StageID { get; set; }
        public ICollection<Punch> Punches { get; set; }

        public Stage Stage { get; set; }
    }
}
