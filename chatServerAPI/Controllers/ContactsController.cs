using Domain;
using Domain.apiDomain;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Services;



namespace chatServerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private IServiceUsers _service;
        private int Id = 1;

        public ContactsController(UsersContext usersContext)
        {
            _service = new ServiceUsers(usersContext);

        }

        // GET: api/Contacts
        [HttpGet]
        public ActionResult<IEnumerable<ContactApi>> GetContact()
        {
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

    // GET: api/Contacts/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ContactApi>> GetContact(int id)
    {
        if (_service.GetAll() == null)
        {
            return NotFound();
        }

        User user = _service.Get(this.Id);
        if (user == null)
        {
            return NotFound();
        }

        ContactApi contactApi =  user.Contacts.First(x => x.Id == id);
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
    public async Task<ActionResult<Contact>> PostContact(ContactApi contact)
    {
        if (_service.GetAll() == null)
        {
            return Problem("Entity set 'UsersContext.Contact'  is null.");
        }
    
        _service.AddContact(this.Id, contact);
    
        return CreatedAtAction("GetContact", new {id = contact.Id}, contact);
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
        ContactApi contact = user.Contacts.First(x => x.Id == id);
        if (contact == null)
        {
            return NotFound();
        }

        user.Contacts.Remove(contact);
    
        return NoContent();
    }
    
    private bool ContactExists(int id)
    {
        return (_service.GetAll()?.Any(e => e.Id == id)).GetValueOrDefault();
    }
    
    }
    
}