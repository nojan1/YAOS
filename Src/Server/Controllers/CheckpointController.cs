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
                    Code = x.Code,
                    StageId = x.StageID
                }).ToList());
        }

        [ProducesResponseType(200, Type = typeof(CheckpointModel))]
        [ProducesResponseType(400)]
        [HttpPost()]
        public IActionResult Post(int competitionID, [FromBody]CheckpointModel input)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newCheckpoint = new Checkpoint
            {
                Code = input.Code,
                StageID = input.StageId
            };

            _context.Checkpoints.Add(newCheckpoint);
            _context.SaveChanges();

            input.Id = newCheckpoint.ID;

            return Ok(input);
        }

        [ProducesResponseType(200, Type = typeof(CheckpointModel))]
        [ProducesResponseType(400)]
        [HttpPut("{checkpointID:int}")]
        public IActionResult Update(int competitionID, int checkpointID, [FromBody]CheckpointModel input)
        {
            return Ok();
        }
    }
}