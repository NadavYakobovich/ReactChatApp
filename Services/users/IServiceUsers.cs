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

    public User? Get(int id);

    public int GetIdByEmail(string email);

    public int GetIdByName(string name);

    public int GetLastId();

    public void Update(int id);

    public void Delete(int id);

    public bool Auth(string email, string pass);

    public void AddContact(int id, ContactApi content);

    public void UpdateLastMessage(int myId, int idFriend, string mess, string time);
}