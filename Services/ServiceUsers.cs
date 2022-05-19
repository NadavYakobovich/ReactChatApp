using Domain;
using Repository;

namespace Services;

public class ServiceUsers : IServiceUsers
{
    private UsersContext _users;

    public ServiceUsers()
    {
        _users = new UsersContext();
    }

    public void Add(User user)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<User> GetAll()
    {
        return _users.usersList;
    }

    public User Get(int id)
    {
        throw new NotImplementedException();
    }

    public void Update(int id)
    {
        throw new NotImplementedException();
    }

    public void Delete(int id)
    {
        throw new NotImplementedException();
    }
}