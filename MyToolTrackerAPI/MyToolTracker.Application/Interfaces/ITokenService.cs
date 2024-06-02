using MyToolTrackerAPI.Domain.Models;

namespace MyToolTrackerAPI.Application.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user); 
    }
}
