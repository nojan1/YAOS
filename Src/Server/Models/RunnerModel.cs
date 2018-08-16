using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class RunnerModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Club { get; set; }
        public ClassModel Class { get; set; }
    }
}
