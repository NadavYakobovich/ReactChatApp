using Domain;
using Domain.apiDomain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Services;
using Services.users;

namespace chatServerAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/contacts/{friendId}/messages/")]
    public class MessagesController : ControllerBase
    {
        private IServiceMessages _service;
        private IServiceUsers _usersService;
        private int _myId;

        public MessagesController(UsersContext usersContext)
        {
            _service = new ServiceMessages(usersContext);
            _usersService = new ServiceUsers(usersContext);
        }

        private void setMyId()
        {
            string? loggedUser = HttpContext.User.FindFirst("username")?.Value;
            if (loggedUser != null)
            {
                _myId = _usersService.GetId(loggedUser);
            }
        }

        //[get a specific content in conversation with friend ]
        //api/contacts/alice/messages/181
        [HttpGet("{messageId}/")]
        public async Task<ActionResult<ContentApi>> GetConversation(int friendId, int messageId)
        {
            setMyId();
            if (_service.GetConversation(_myId, friendId) == null)
            {
                return NotFound("not found contact with that id");
            }


            ContentApi? content = _service.Get(_myId, friendId, messageId);
            if (content == null)
            {
                return NotFound("not content found with the id");
            }

            return content;
        }

        //[get all conversation with the friend]
        //api/contacts/alice/messages/
        [HttpGet()]
        public async Task<ActionResult<List<ContentApi>>> GetConversation(int friendId)
        {
            setMyId();
            if (_service.GetConversation(_myId, friendId) == null)
            {
                return NotFound();
            }

            List<ContentApi>? listCon = _service.GetConversation(_myId, friendId);
            return listCon;
        }

        // DELETE: api/Contacts/alice/messages/181
        [HttpDelete("{idMessages}/")]
        public async Task<IActionResult> DeleteContact(int friendId, int idMessages)
        {
            setMyId();
            if (_service.GetConversation(_myId, friendId) == null)
            {
                return NotFound();
            }

            ContentApi? contentApi = _service.Get(_myId, friendId, idMessages);
            if (contentApi == null)
            {
                return NotFound();
            }

            _service.Delete(_myId, friendId, contentApi);
            return NoContent();
        }

        // POST
        // api/contacts/alice/messages
        [HttpPost]
        public async Task<ActionResult<Contact>> PostMessages(int friendId, string content)
        {
            setMyId();
            List<ContentApi>? conversation = _service.GetConversation(_myId, friendId);
            if (conversation == null)
            {
                return NotFound();
            }

            int nextId = conversation.Max(x => x.Id) + 1;
            ContentApi contentApi = new ContentApi()
                {Content = content, Created = DateTime.Now.ToString(), Id = nextId, Sent = true};
            _service.Add(_myId, friendId, contentApi);

            return NoContent();
        }

        //[PUT]
        //api/contacts/alice/messages/183
        [HttpPut("{idMessages}/")]
        public async Task<IActionResult> PutMessage(int friendId, int idMessages, string content)
        {
            setMyId();
            ContentApi? contentApi = _service.Get(_myId, friendId, idMessages);
            if (contentApi != null)
            {
                contentApi.Content = content;
            }
            else
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}