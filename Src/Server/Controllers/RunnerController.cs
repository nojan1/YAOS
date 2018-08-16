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
    public class RunnerController : ControllerBase
    {
        private readonly Context _context;

        public RunnerController(Context context)
        {
            _context = context;
        }

        [Produces(typeof(IEnumerable<RunnerModel>))]
        [HttpGet("")]
        public IActionResult Get(int competitionID)
        {
            return Ok(new RunnerModel[0]);
        }
    }
}