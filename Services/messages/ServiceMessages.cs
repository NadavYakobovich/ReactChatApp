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

    public void AddContent(int myId, int idFriend, ContentApi contentApi)
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

    public List<ContentApi> GetConversation(int myId, int idFriend)
    {
        var conversation = _conversations.FirstOrDefault(x => x.user == myId && x.contact == idFriend);
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