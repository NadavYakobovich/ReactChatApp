using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Repository;
using Services;
using Services.users;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace chatServerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly IServiceUsers _service;

        public UsersController(IConfiguration config, UsersContext context)
        {
            _configuration = config;
            _service = new ServiceUsers(context);
        }

        // GET: api/Users
        [HttpPost]
        public IActionResult Post(string email, string password)
        {
            try
            {
                if (_service.Auth(email, password))
                {
                    var id = _service.GetID(email);
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["JWTParams:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("username", email)
                    };

                    var secretKey =
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWTParams:SecretKey"]));
                    var mac = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["JWTParams:Issuer"],
                        _configuration["JWTParams:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(20),
                        signingCredentials: mac);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token) + ' ' + id);
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // GET: api/Users/5
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            User? userFound = _service.Get(id);
            if (userFound != null)
            {
                return Ok(userFound);
            }
            else
            {
                return NotFound();
            }
        }

        // //POST: api/Users
        // [Authorize]
        // [HttpPost]
        // public IActionResult Add(string name, string email, string password)
        // {
        //     
        // }
    }
    //
    // // GET: api/Users/5
    // [HttpGet("{id}", Name = "Get")]
    // public string Get(int id)
    // {
    //     return "value";
    // }
    //
    // // POST: api/Users
    // [HttpPost]
    // public void Post([FromBody] string value)
    // {
    // }
    //
    // // PUT: api/Users/5
    // [HttpPut("{id}")]
    // public void Put(int id, [FromBody] string value)
    // {
    // }
    //
    // // DELETE: api/Users/5
    // [HttpDelete("{id}")]
    // public void Delete(int id)
    // {
    // }
}