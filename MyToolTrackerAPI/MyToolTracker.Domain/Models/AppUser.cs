using Microsoft.AspNetCore.Identity;

namespace MyToolTrackerAPI.Domain.Models
{
    public class AppUser : IdentityUser
    {

        public int MyProperty { get; set; }

    }
}
