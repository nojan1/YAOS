using System.Collections;
using System.Collections.Generic;

namespace Server.Entities
{
    public class Stage
    {
        public int ID { get; set; }
        public int CompetitionID { get; set; }

        public Competition Competition { get; set; }
        public ICollection<Class> Classes { get; set; }
        public IEnumerable<Map> Maps { get; set; }
        public IEnumerable<Checkpoint> Checkpoints { get; set; }
        public IEnumerable<Badge> Badges { get; set; }
    }
}