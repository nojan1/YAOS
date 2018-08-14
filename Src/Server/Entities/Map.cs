using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Entities
{
    public class OrderedCheckpoint
    {
        public int ID { get; set; }
        public int CheckpointID { get; set; }
        public int MapID { get; set; }
        public int Order { get; set; }
    }

    public class Map
    {
        public int ID { get; set; }
        public int StageID { get; set; }

        public ICollection<OrderedCheckpoint> Checkpoints { get; set; }
        public Stage Stage { get; set; }
    }
}
