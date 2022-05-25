using Domain;
using Domain.apiDomain;

namespace Services;

public interface IServiceUsers
{
    //CRUD -> Create   Read      Update   Delete
    //        Add      GetUser   Update   Delete
    //                 GetAll

    public void Add(User user);

    public IEnumerable<User>? GetAll();

    public User? Get(string id);
    
    public string GetIdByName(string name);
    
    public void Update(string id);

    public void Delete(string id);

    public bool Auth(string username, string pass);

    public void AddContact(string id, ContactApi content);

    public void UpdateLastMessage(string myId, string idFriend, string mess, string time);
}