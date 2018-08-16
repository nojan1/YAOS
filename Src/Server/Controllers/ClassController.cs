using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Entities;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/competition/{competitionID:int}/[controller]/")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly Context _context;

        public ClassController(Context context)
        {
            _context = context;
        }

        [Produces(typeof(IEnumerable<ClassWithPropertiesModel>))]
        [HttpGet("")]
        public IActionResult Get(int competitionID)
        {
            return Ok(_context.Classes
                .Where(x => x.Stage.CompetitionID == competitionID)
                .Select(x => new ClassWithPropertiesModel
                {
                    Id = x.ID,
                    Name = x.Name,
                    AllowBadgeStart = x.AllowBadgeStart,
                    HasStartTime = x.HasStartTime,
                    TimeSpacing = x.TimeSpacing,
                    VacancyPercentage = x.VacancyPercentage
                }).ToList());
        }
    }
}
