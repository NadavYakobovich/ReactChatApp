using Domain;
using Domain.apiDomain;
using Repository;

namespace Services;

public class ServiceMessages : IServiceMessages
{
    public int  IdUser { get; set; }
    private List<Conversation> Conversations; //check

    public ServiceMessages(int idUser, UsersContext usersContext)
    {
        this.Conversations = usersContext.Conversations;
        this.IdUser = idUser;
    }    
    public void Add(int idFriend, ContentApi contentApi)
    {
        GetConversation(idFriend).Add(contentApi);
    }

    public IEnumerable<Conversation> GetAll()
    {
        throw new NotImplementedException();
    }

    public List<ContentApi> GetConversation(int idFriend)
    {
        return Conversations.First(x => (x.Id1 == idFriend && x.Id2 == IdUser) || (x.Id1 == IdUser && x.Id2 == idFriend)).Contents;
    }

    public ContentApi Get(int idUserFriend, int idMessage)
    {
        ContentApi content = GetConversation(idMessage).First(x => x.Id == idMessage);
        return content;
    }

    public void Update(int idFriend, string content)
    {
        throw new NotImplementedException();
    }

    public void Delete(int idFriend, ContentApi contentApi)
    {
        GetConversation(idFriend).Remove(contentApi);
    }
}