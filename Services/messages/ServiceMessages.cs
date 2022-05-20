using Domain;
using Domain.apiDomain;
using Repository;

namespace Services.messages;

public class ServiceMessages : IServiceMessages
{
    public int  IdUser { get; set; }
    private List<Conversation>? Conversations; //check

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
        var conversation = Conversations.FirstOrDefault(x =>
            ((x.Id1 == idFriend && x.Id2 == IdUser) || (x.Id1 == IdUser && x.Id2 == idFriend)));
        if (conversation == null)
        {
            return null;
        }
        else
        {
            return conversation.Contents;
        }
    }

    public ContentApi? Get(int idUserFriend, int idMessage)
    {
        List<ContentApi>? conv = GetConversation(idUserFriend);
        if (conv == null)
        {
            return null;
        }
        ContentApi? content = conv.FirstOrDefault(x => x.Id == idMessage);
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