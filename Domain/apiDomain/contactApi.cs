
namespace Domain.apiDomain;

public class ContactApi
{
    public string Id { get; set; }

    public string Name { get; set; }

    public string? Server { get; set; }

    //lastMessage
    public string? last { get; set; }
    //the time of the last message
    public string? lastdate { get; set; }
    
    
    //constrctor

    public ContactApi( string id , string name, string server, string last, string lastdate)
    {
        this.Id = id;
        this.Name = name;
        this.Server = server;
        this.last = last;
        this.lastdate = lastdate;
    }

    public ContactApi() {}
    
}