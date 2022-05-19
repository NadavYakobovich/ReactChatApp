using Domain.apiDomain;

namespace Domain;

public class Conversation
{
    public int Id { get; set; }
    public int Id1 { get; set; }
    public int Id2 { get; set; }
    public List<ContentApi>? Contents { get; set; }
}