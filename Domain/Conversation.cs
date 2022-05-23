using Domain.apiDomain;

namespace Domain;

public class Conversation
{
    public int Id { get; set; }
    public int user { get; set; }
    public int contact { get; set; }
    public List<ContentApi>? Contents { get; set; }
}