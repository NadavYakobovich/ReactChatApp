using Domain;
using Domain.apiDomain;
using Repository;

namespace Services.messages;

public class ServiceMessages : IServiceMessages
{
    private List<Conversation>? _conversations; //check

    public ServiceMessages(UsersContext usersContext)
    {
        _conversations = usersContext.Conversations;
    }

    public void AddContent(string myId, string idFriend, ContentApi contentApi)
    {
        GetConversation(myId, idFriend).Add(contentApi);
    }

    public void AddConv(Conversation conv)
    {
        _conversations?.Add(conv);
    }

    public IEnumerable<Conversation> GetAll()
    {
        throw new NotImplementedException();
    }

    public int GetLastConvId()
    {
        return _conversations.Last().Id;
    }

    public List<ContentApi> GetConversation(string myId, string idFriend)
    {
        var conversation = _conversations.FirstOrDefault(x => x.from == myId && x.to == idFriend);
        if (conversation == null)
        {
            return null;
        }
        else
        {
            return conversation.Contents;
        }
    }

    public ContentApi? Get(string myId, string idUserFriend, int idMessage)
    {
        List<ContentApi>? conv = GetConversation(myId, idUserFriend);
        if (conv == null)
        {
            return null;
        }

        ContentApi? content = conv.FirstOrDefault(x => x.Id == idMessage);
        return content;
    }

    public void Update(string idFriend, string content)
    {
        throw new NotImplementedException();
    }

    public void Delete(string myId, string idFriend, ContentApi contentApi)
    {
        GetConversation(myId, idFriend).Remove(contentApi);
    }
}