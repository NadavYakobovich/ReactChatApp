using System.ComponentModel.DataAnnotations;
using Domain.apiDomain;

namespace Domain;

public class User
{
    [Key]
    public string Id { get; set; }

    [MaxLength(50)]
    public string? Name { get; set; }
    
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    public List<ContactApi>? Contacts { get; set; }
}