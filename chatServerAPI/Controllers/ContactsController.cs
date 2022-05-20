using System.Security.Claims;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Services;

namespace chatServerAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private IServiceUsers _service;
        private int Id;

        public ContactsController(UsersContext context)
        {
            _service = new ServiceUsers(context);
        }

        // GET: api/Contacts
        [HttpGet]
        public ActionResult<IEnumerable<Contact>> GetContact()
        {
            try
            {
                string? loggedUser = HttpContext.User.FindFirst("username")?.Value;
                if (loggedUser != null)
                {
                    Id = _service.GetID(loggedUser);
                }

                if (_service.GetAll() == null)
                {
                    return NotFound();
                }
                else
                {
                    List<User> users = _service.GetAll().ToList();
                    return users[0].Contacts;
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //     // GET: api/Contacts/5
        //     [HttpGet("{id}")]
        //     public async Task<ActionResult<Contact>> GetContact(int id)
        //     {
        //         if (_service.Contacts == null)
        //         {
        //             return NotFound();
        //         }
        //
        //         var contact = await _service.Contact.FindAsync(id);
        //
        //         if (contact == null)
        //         {
        //             return NotFound();
        //         }
        //
        //         return contact;
        //     }
        //
        //     // PUT: api/Contacts/5
        //     // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //     [HttpPut("{id}")]
        //     public async Task<IActionResult> PutContact(int id, Contact contact)
        //     {
        //         if (id != contact.Id)
        //         {
        //             return BadRequest();
        //         }
        //
        //         _service.Entry(contact).State = EntityState.Modified;
        //
        //         try
        //         {
        //             await _service.SaveChangesAsync();
        //         }
        //         catch (DbUpdateConcurrencyException)
        //         {
        //             if (!ContactExists(id))
        //             {
        //                 return NotFound();
        //             }
        //             else
        //             {
        //                 throw;
        //             }
        //         }
        //
        //         return NoContent();
        //     }
        //
        //     // POST: api/Contacts
        //     // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //     [HttpPost]
        //     public async Task<ActionResult<Contact>> PostContact(Contact contact)
        //     {
        //         if (_service.Contact == null)
        //         {
        //             return Problem("Entity set 'UsersContext.Contact'  is null.");
        //         }
        //
        //         _service.Contact.Add(contact);
        //         await _service.SaveChangesAsync();
        //
        //         return CreatedAtAction("GetContact", new {id = contact.Id}, contact);
        //     }
        //
        //     // DELETE: api/Contacts/5
        //     [HttpDelete("{id}")]
        //     public async Task<IActionResult> DeleteContact(int id)
        //     {
        //         if (_service.Contact == null)
        //         {
        //             return NotFound();
        //         }
        //
        //         var contact = await _service.Contact.FindAsync(id);
        //         if (contact == null)
        //         {
        //             return NotFound();
        //         }
        //
        //         _service.Contact.Remove(contact);
        //         await _service.SaveChangesAsync();
        //
        //         return NoContent();
        //     }
        //
        //     private bool ContactExists(int id)
        //     {
        //         return (_service.Contact?.Any(e => e.Id == id)).GetValueOrDefault();
        //     }
    }
}