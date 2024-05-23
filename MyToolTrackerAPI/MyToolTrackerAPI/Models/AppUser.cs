using Microsoft.AspNetCore.Identity;

namespace MyToolTrackerAPI.Models
{
    public class AppUser : IdentityUser
    {

        public int MyProperty { get; set; }

    }
}
