
namespace Domain.apiDomain;

public class ContactApi
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string? Server { get; set; }

    //lastMessage
    public string last { get; set; }
    //the time of the last message
    public string lastdate { get; set; }
    //constrctur 
    public ContactApi(Contact con)
    {
        this.Id = con.Id;
        this.Name = con.name;
        this.Server = "check";
        this.last = con.last;
        this.lastdate = con.lastDate;
    }
    
    public ContactApi( int id , string name, string server, string last, string lastdate)
    {
        this.Id = id;
        this.Name = name;
        this.Server = server;
        this.last = last;
        this.lastdate = lastdate;
    }

    public ContactApi() {}

    public static List<ContactApi> listApiContact(List<Contact> list)
    {
        List<ContactApi> newList = new List<ContactApi>();
        foreach (Contact contact in list)
        {
            newList.Add(  new ContactApi(contact));
        }
        return newList;
    }

}