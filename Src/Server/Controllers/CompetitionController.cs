using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompetitionController : ControllerBase
    {
        [Produces(typeof(IEnumerable<Competition>))]
        [HttpGet("")]
        public IActionResult Get()
        {
            return Ok(new Competition[]
            {
                new Competition {
                    Id = 1,
                    Name = "Test"
                }
            });
        }
    }
}