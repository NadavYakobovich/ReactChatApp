using Domain;
using Repository;

namespace Services;

public class ServiceUsers : IServiceUsers
{
    private UsersContext _users;

    public ServiceUsers(UsersContext context)
    {
        _users = context;
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

    public int GetID(string email)
    {
        User? userFound = _users.usersList.Find(user => user.Email == email);
        if (userFound != null)
        {
            return userFound.Id;
        }
        return -1;
    }

    public bool Auth(string email, string pass)
    {
        User? userFound = _users.usersList.Find(user => user.Email == email && user.Password == pass);
        if (userFound != null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}