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
    [Route("api/[controller]/{competitionID:int}/")]
    [ApiController]
    public class CheckpointController : ControllerBase
    {
        private readonly Context _context;

        public CheckpointController(Context context)
        {
            _context = context;
        }

        [Produces(typeof(IEnumerable<CheckpointModel>))]
        [HttpGet("")]
        public IActionResult Get(int competitionID)
        {
            return Ok(_context.Checkpoints
                .Where(x => x.Stage.CompetitionID == competitionID)
                .Select(x => new CheckpointModel
                {
                    Id = x.ID,
                    Code = x.Code
                }).ToList());
        }
    }
}