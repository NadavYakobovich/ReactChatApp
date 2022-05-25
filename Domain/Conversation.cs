using Domain.apiDomain;

namespace Domain;

public class Conversation
{
    public int Id { get; set; }
    public string from { get; set; }
    public string to { get; set; }
    public List<ContentApi>? Contents { get; set; }
}