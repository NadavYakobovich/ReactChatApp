using System.ComponentModel.DataAnnotations;
using Domain.apiDomain;

namespace Domain;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    [RegularExpression(@"/^[a-zA-Z\\s]*$/")]
    public string Name { get; set; }

    [Required]
    [DataType(DataType.EmailAddress)]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    public List<ContactApi>? Contacts { get; set; }
}