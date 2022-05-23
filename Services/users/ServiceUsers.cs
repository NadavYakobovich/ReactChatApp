using Domain;
using Domain.apiDomain;
using Repository;

namespace Services.users;

public class ServiceUsers : IServiceUsers
{
    private UsersContext _users;

    public ServiceUsers(UsersContext context)
    {
        _users = context;
    }

    public void Add(User user)
    {
        _users.usersList.Add(user);
    }

    //add contact to the contact list of the user with the id
    public void AddContact(int id, ContactApi contact)
    {
        _users.usersList.First(x => x.Id == id).Contacts.Add(contact);
    }

    public IEnumerable<User>? GetAll()
    {
        return _users.usersList;
    }
    


    public User? Get(int id)
    {
        return _users.usersList.FirstOrDefault(x => x.Id == id);
    }

    // this method will return the last id in the users list
    public int GetLastId()
    {
        return _users.usersList.Last().Id;
    }

    public void Update(int id)
    {
        throw new NotImplementedException();
    }

    public void Delete(int id)
    {
        throw new NotImplementedException();
    }

    public int GetIdByEmail(string email)
    {
        User? userFound = _users.usersList.Find(user => user.Email == email);
        if (userFound != null)
        {
            return userFound.Id;
        }

        return -1;
    }
    
    public int GetIdByName(string name)
    {
        User? userFound = _users.usersList.Find(user => user.Name == name);
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
    
    public void UpdateLastMessage(int myId,int idFriend,string mess, string time)
    {
        ContactApi friend = Get(myId).Contacts.FirstOrDefault(contact => contact.Id == idFriend);
        if (friend == null)
        {
            return;
        }
        friend.last = mess;
        friend.lastdate = time;
    }
}