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
    public void AddContact(string id, ContactApi contact)
    {
        Get(id).Contacts.Add(contact);
    }

    public IEnumerable<User>? GetAll()
    {
        return _users.usersList;
    }


    public User? Get(string id)
    {
        return _users.usersList.FirstOrDefault(x => x.Id == id);
    }

    // this method will return the last id in the users list

    public void Update(string id)
    {
        throw new NotImplementedException();
    }

    public void Delete(string id)
    {
        throw new NotImplementedException();
    }

    public string GetIdByName(string name)
    {
        User? userFound = _users.usersList.Find(user => user.Name == name);
        if (userFound != null)
        {
            return userFound.Id;
        }

        return "-1";
    }

    public bool Auth(string username, string pass)
    {
        User? userFound = _users.usersList.Find(user => user.Id == username && user.Password == pass);
        if (userFound != null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public void UpdateLastMessage(string myId, string idFriend, string mess, string time)
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