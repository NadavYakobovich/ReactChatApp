using System.Security.Claims;
using Domain;
using Domain.apiDomain;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Services;
using Services.messages;
using Services.users;

namespace chatServerAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private IServiceUsers _service;
        private IServiceMessages _serviceConv;
        private string _myId;

        public ContactsController(UsersContext context)
        {
            _service = new ServiceUsers(context);
            _serviceConv = new ServiceMessages(context);
        }

        private void SetMyId()
        {
            string? loggedUser = HttpContext.User.FindFirst("username")?.Value;
            if (loggedUser != null)
            {
                this._myId = loggedUser;
            }
        }

        // GET: api/Contacts
        [HttpGet]
        public ActionResult<IEnumerable<ContactApi>> GetContact()
        {
            try
            {
                SetMyId();
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
        public async Task<ActionResult<ContactApi>> GetContact(string id)
        {
            SetMyId();
            if (_service.GetAll() == null)
            {
                return NotFound();
            }

            User? user = _service.Get(_myId);
            if (user == null)
            {
                return NotFound();
            }

            ContactApi? contactApi = user.Contacts.FirstOrDefault(x => x.Id == id);
            if (contactApi == null)
            {
                return NotFound();
            }

            return contactApi;
        }

        // PUT: api/Contacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(  [FromBody] ContactApi inputContact)
        {
            SetMyId();
            ContactApi contact = _service.Get(_myId).Contacts.First(x => x.Id == inputContact.Id);
            //not found the contact in the contact list of the user
            if (contact == null)
            {
                return BadRequest();
            }

            contact.Name = inputContact.Name;
            contact.Server = inputContact.Server;

            return NoContent();
        }

        //POST: api/Contacts
        //To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact([FromBody] ContactApi inputContact)
        {
            SetMyId();
            if (_service.GetAll() == null)
            {
                return Problem("Entity set 'UsersContext.Contact'  is null.");
            }

            ContactApi contact = new ContactApi() {Id = inputContact.Id, Name = inputContact.Name, Server = inputContact.Server, last = null, lastdate = null};
            //check if there is already contact with the same id
            User user = _service.Get(_myId);
            if (user.Contacts.FirstOrDefault(x => x.Id == contact.Id) != null)
            {
                return BadRequest("Id is already exist");
            }

            //creat empty conversation with the new contacts
            Conversation conv = new Conversation()
            {
                Contents = new List<ContentApi>(), from = _myId, Id = _serviceConv.GetLastConvId() + 1, to = contact.Id
            };
            _serviceConv.AddConv(conv);
            _service.AddContact(_myId, contact);
            return NoContent();
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(string id)
        {
            SetMyId();
            if (_service.GetAll() == null)
            {
                return NotFound();
            }

            User user = _service.Get(_myId);
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