using Domain;
using Domain.apiDomain;
using Repository;

namespace Services;

public class ServiceMessages : IServiceMessages
{
    private List<Conversation>? Conversations; //check

    public ServiceMessages(UsersContext usersContext)
    {
        this.Conversations = usersContext.Conversations;
    }

    public void Add(int myId, int idFriend, ContentApi contentApi)
    {
        GetConversation(myId, idFriend).Add(contentApi);
    }

    public IEnumerable<Conversation> GetAll()
    {
        throw new NotImplementedException();
    }

    public List<ContentApi> GetConversation(int myId, int idFriend)
    {
        var conversation = Conversations.FirstOrDefault(x =>
            ((x.Id1 == idFriend && x.Id2 == myId) || (x.Id1 == myId && x.Id2 == idFriend)));
        if (conversation == null)
        {
            return null;
        }
        else
        {
            return conversation.Contents;
        }
    }

    public ContentApi? Get(int myId, int idUserFriend, int idMessage)
    {
        List<ContentApi>? conv = GetConversation(myId, idUserFriend);
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

    public void Delete(int myId, int idFriend, ContentApi contentApi)
    {
        GetConversation(myId, idFriend).Remove(contentApi);
    }
}