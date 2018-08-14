using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Entities
{

    public class Runner
    {
        public int ID { get; set; }
        public int? BadgeID { get; set; }
        public int? ClassID { get; set; }

        public string Name { get; set; }

        public Badge Badge { get; set; }
        public Class Class { get; set; }
    }
}
