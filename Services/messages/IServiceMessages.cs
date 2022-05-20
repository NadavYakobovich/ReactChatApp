using Domain;
using Domain.apiDomain;

namespace Services;

public interface IServiceMessages
{
    public int  IdUser { get; set; }

    public void Add(int idReceived,ContentApi contentApi);

    // get all the conversation that the user have
    public IEnumerable<Conversation> GetAll();

    //get all the conversation with the friend
    public List<ContentApi>? GetConversation(int idFriend);

    //get the message with the ID in the conversation with the  friend
    public ContentApi? Get(int idUserFriend, int idMessage);

    public void Update(int idFriend, string content);

    public void Delete(int idFriend, ContentApi contentApi);
    
    
}