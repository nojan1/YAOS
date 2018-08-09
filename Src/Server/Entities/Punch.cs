using System;

namespace Server.Entities
{
    public class Punch
    {
        public int ID { get; set; }
        public int BadgeID { get; set; }
        public int StationCode { get; set; }
        public DateTime Timestamp { get; set; }
    }
}