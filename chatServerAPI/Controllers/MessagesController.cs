using Domain;
using Domain.apiDomain;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Services;

namespace chatServerAPI.Controllers
{
    [Route("api/contacts/{id}/messages/")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private int IdUser = 1;
        private IServiceMessages _service;
        
        public MessagesController(UsersContext usersContext)
        {
            this._service = new ServiceMessages(this.IdUser,usersContext);
        }
        
        //[get a specific content in conversation with friend ]
        //api/contacts/alice/messages/181
        [HttpGet("{messageId}/")]
        public async Task<ActionResult<ContentApi>> GetConversation(int id, int messageId)
        {
            if (_service.GetConversation(id) == null)
            {
                return NotFound("not found contact with that id");
            }


        
            ContentApi content =  _service.Get(id, messageId);
            if (content == null)
            {
                return NotFound("not content found with the id");
            }
            {
                
            }
            return content;
        }
        //[get all conversation with the friend]
        //api/contacts/alice/messages/
        [HttpGet()]
        public async Task<ActionResult<List<ContentApi>>> GetConversation(int id)
        {
            if (_service.GetConversation(id) == null)
            {
                return NotFound();
            }
            
            List<ContentApi> listCon = _service.GetConversation(id);
            return listCon;
        }
        // DELETE: api/Contacts/alice/messages/181
        [HttpDelete("{idMessages}/")]
        public async Task<IActionResult> DeleteContact(int id,int idMessages)
        {
            if (_service.GetConversation(id) == null)
            {
                return NotFound();
            }
        
            ContentApi contentApi = _service.Get(id, idMessages);
            if (contentApi == null)
            {
                return NotFound();
            }
            _service.Delete(id, contentApi);
            return NoContent();
        }
        // POST
        // api/contacts/alice/messages
         [HttpPost]
         public async Task<ActionResult<Contact>> PostMessages(int id,string content)
         {
             List<ContentApi> conversation = _service.GetConversation(id);
             if (conversation == null)
             {
                 return NotFound();
             }
             int nextId = conversation.Max(x => x.Id) + 1;
             ContentApi contentApi = new ContentApi() {Content = content, Created = DateTime.Now.ToString(), Id = nextId, Sent = true};
             _service.Add(id,contentApi);

             return NoContent();
         }
         
         //[PUT]
         //api/contacts/alice/messages/183
         [HttpPut("{idMessages}/")]
         public async Task<IActionResult> PutMessage(int id, int idMessages, string content)
         {
             ContentApi contentApi = _service.Get(id, idMessages);
             contentApi.Content = content;
             return NoContent();
         }




    }
}
