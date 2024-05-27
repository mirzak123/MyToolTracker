using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user); 
    }
}
