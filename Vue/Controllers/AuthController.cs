using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Vue.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        [HttpPost("token")]
        public IActionResult Token()
        {
            var header = Request.Headers["Authorization"];
            if (header.ToString().StartsWith("Basic"))
            {
                var credValue = header.ToString().Substring("Basic ".Length).Trim();
                var usernameAndPasssenc = Encoding.UTF8.GetString(Convert.FromBase64String(credValue));//admin:pass
                var usernameAndPass = usernameAndPasssenc.Split(":");
                
                if (usernameAndPass[0] == "Admin" && usernameAndPass[1] == "pass")
                {
                    var claimsdata = new[]
                    {
                         new Claim(ClaimTypes.Name,usernameAndPass[0])
                    };
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("fdassdkbsjkgbgasasbsbkjlgabjsajbjksab"));
                    var signInCred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
                    //string tokenString = "test";
                    var token = new JwtSecurityToken(
                        issuer: "mysite",
                        audience: "mysite",
                        expires: DateTime.Now.AddMinutes(1),
                        claims: claimsdata,
                        signingCredentials: signInCred
                        );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                    return Ok(tokenString);
                }
            }
            return BadRequest("wrong request");
        }
    }
}
