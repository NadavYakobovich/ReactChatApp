using Domain;
using Domain.apiDomain;

namespace Services;

public interface IServiceMessages
{
    public void AddContent(string myId, string idReceived, ContentApi contentApi);

    public void AddConv(Conversation conv);

    // get all the conversation that the user have
    public IEnumerable<Conversation> GetAll();

    //get the last conversation id
    public int GetLastConvId();

    //get all the conversation with the friend
    public List<ContentApi>? GetConversation(string myId, string idFriend);

    //get the message with the ID in the conversation with the  friend
    public ContentApi? Get(string myId, string idUserFriend, int idMessage);

    public void Update(string idFriend, string content);

    public void Delete(string myId, string idFriend, ContentApi contentApi);

}