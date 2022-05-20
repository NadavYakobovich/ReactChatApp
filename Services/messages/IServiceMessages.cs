using Domain;
using Domain.apiDomain;

namespace Services;

public interface IServiceMessages
{
    public void Add(int myId, int idReceived, ContentApi contentApi);

    // get all the conversation that the user have
    public IEnumerable<Conversation> GetAll();

    //get all the conversation with the friend
    public List<ContentApi>? GetConversation(int myId, int idFriend);

    //get the message with the ID in the conversation with the  friend
    public ContentApi? Get(int myId, int idUserFriend, int idMessage);

    public void Update(int idFriend, string content);

    public void Delete(int myId, int idFriend, ContentApi contentApi);
}