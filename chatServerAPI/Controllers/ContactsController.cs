using System.Security.Claims;
using Domain;
using Domain.apiDomain;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Services;
using Services.users;

namespace chatServerAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private IServiceUsers _service;
        private int _myId;

        public ContactsController(UsersContext context)
        {
            _service = new ServiceUsers(context);
        }
        
        private void setMyId()
        {
            string? loggedUser = HttpContext.User.FindFirst("username")?.Value;
            if (loggedUser != null)
            {
                this._myId = _service.GetID(loggedUser);
            }
        }
        
        // GET: api/Contacts
        [HttpGet]
        public ActionResult<IEnumerable<ContactApi>> GetContact()
        {
            try
            {
                setMyId();
                if (_service.GetAll() == null)
                {
                    return NotFound();
                }
                else
                {
                    User user = _service.Get(this._myId);
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
        setMyId();
        if (_service.GetAll() == null)
        {
            return NotFound();
        }

        User? user = _service.Get(this._myId);
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
            setMyId();
            ContactApi contact = _service.Get(this._myId).Contacts.First(x=>x.Id == id);
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
        setMyId();
        if (_service.GetAll() == null)
        {
            return Problem("Entity set 'UsersContext.Contact'  is null.");
        }
        ContactApi contact = new ContactApi() {Id = id, Name = name, Server = server, last = null, lastdate = null};
        //check if there is already contact with the same id
        User user = _service.Get(this._myId);
        if (user.Contacts.FirstOrDefault(x => x.Id == contact.Id) != null)
        {
            return BadRequest("Id is already exist");
        }
        _service.AddContact(this._myId, contact);
        return NoContent();
    }
    
    // DELETE: api/Contacts/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteContact(int id)
    {
        setMyId();
        if (_service.GetAll() == null)
        {
            return NotFound();
        }

        User user = _service.Get(this._myId);
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
