using System.ComponentModel.DataAnnotations;

namespace chatServer.Models;

public class Rating
{
    
    [Required]
    public int Id {get; set; }
    [Required]
    public string Name { get; set; }
    public string Review { get; set; }
    public string Time { get; set; }
    [Required, Range(0, 5)]
    public int Stars { get; set; }
}