using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InfoController : Controller
    {
        [Produces(typeof(ServerInfo))]
        [HttpGet("")]
        public IActionResult Get()
        {
            return Ok(new ServerInfo
            {
                Version = "0.0.1"
            });
        }
    }
}
