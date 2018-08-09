using System.Collections;
using System.Collections.Generic;

namespace Server.Entities
{
    public class Stage
    {
        public int ID { get; set; }
        public int CompetitionID { get; set; }

        public ICollection<Class> Classes { get; set; }
    }
}