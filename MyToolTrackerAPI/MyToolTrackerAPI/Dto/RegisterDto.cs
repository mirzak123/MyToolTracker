using System.ComponentModel.DataAnnotations;

namespace MyToolTrackerAPI.Dto
{
    public class RegisterDto
    {


        [Required]
        public string? Username { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}
