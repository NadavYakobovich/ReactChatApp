using Domain;
using Domain.apiDomain;
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

    //add contact to the contact list of the user with the id
    public void AddContact(int id, ContactApi contact)
    {
        _users.usersList.First(x=>x.Id == id).Contacts.Add( contact);
    }

    public IEnumerable<User> GetAll()
    {
        return _users.usersList;
    }

    public User Get(int id)
    {
        return _users.usersList.First(x => x.Id == id);
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