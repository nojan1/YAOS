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
    [Route("api/[controller]")]
    [ApiController]
    public class CompetitionController : ControllerBase
    {
        private readonly Context _context;

        public CompetitionController(Context context)
        {
            _context = context;
        }

        [Produces(typeof(IEnumerable<CompetitionModel>))]
        [HttpGet("")]
        public IActionResult Get()
        {
            return Ok(_context.Competitions
                .Select(x => new CompetitionModel
                {
                    Id = x.ID,
                    Name = x.Name
                }).ToList());
        }
    }
}