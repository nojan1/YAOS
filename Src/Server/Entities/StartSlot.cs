using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Entities
{
    public class StartSlot
    {
        public int ID { get; set; }
        public int StageÍD { get; set; }
        public int? RunnerID { get; set; }
        public int MinuteOffset { get; set; }

        public Stage Stage { get; set; }
        public Runner Runner { get; set; }
    }
}
