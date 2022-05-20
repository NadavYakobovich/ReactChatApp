using System.Security.Claims;
using Domain;
using Domain.apiDomain;
using Microsoft.AspNetCore.Http.Extensions;
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
        public ActionResult<IEnumerable<ContactApi>> GetContact()
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
                    User user = _service.Get(this.Id);
                    return user.Contacts;
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
         // GET: api/Contacts/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ContactApi>> GetContact(int id)
    {
        if (_service.GetAll() == null)
        {
            return NotFound();
        }

        User? user = _service.Get(this.Id);
        if (user == null)
        {
            return NotFound();
        }
        ContactApi? contactApi =  user.Contacts.FirstOrDefault(x => x.Id == id);
        if (contactApi == null)
        {
            return NotFound();
        }
        return contactApi;
    }
    
        // PUT: api/Contacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact( int id ,string name, string server)
        {
            ContactApi contact = _service.Get(this.Id).Contacts.First(x=>x.Id == id);
            //not found the contact in the contact list of the user
            if (contact == null)
            {
                return BadRequest();
            }

            contact.Name = name;
            contact.Server = server;
 
             return NoContent();
        }
    
    //POST: api/Contacts
    //To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Contact>> PostContact(int id, string name,string server)
    {
        if (_service.GetAll() == null)
        {
            return Problem("Entity set 'UsersContext.Contact'  is null.");
        }
        ContactApi contact = new ContactApi() {Id = id, Name = name, Server = server, last = null, lastdate = null};
        //check if there is already contact with the same id
        User user = _service.Get(this.Id);
        if (user.Contacts.FirstOrDefault(x => x.Id == contact.Id) != null)
        {
            return BadRequest("Id is already exist");
        }
        _service.AddContact(this.Id, contact);
        return NoContent();
    }
    
    // DELETE: api/Contacts/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteContact(int id)
    {
        if (_service.GetAll() == null)
        {
            return NotFound();
        }

        User user = _service.Get(this.Id);
        ContactApi contact = user.Contacts.FirstOrDefault(x => x.Id == id);
        if (contact == null)
        {
            return NotFound();
        }
        
        user.Contacts.Remove(contact);
    
        return NoContent();
    }
    
    }
    
}
