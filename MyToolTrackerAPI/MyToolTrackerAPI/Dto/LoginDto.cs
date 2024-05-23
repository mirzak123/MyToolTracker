using System.ComponentModel.DataAnnotations;

namespace MyToolTrackerAPI.Dto
{
    public class LoginDto
    {

        [Required]
         public string Username { get; set; }

        public string Password { get; set; }

    }
}
