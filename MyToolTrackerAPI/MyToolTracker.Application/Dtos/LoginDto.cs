using System.ComponentModel.DataAnnotations;
namespace MyToolTrackerAPI.Application.Dtos
{
    public class LoginDto
    {

        [Required]
         public string Username { get; set; }

        public string Password { get; set; }

    }
}
