using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using chatServerAPI.Hubs;
using Domain;
using Domain.apiDomain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Repository;
using Services;
using Services.messages;
using Services.users;

namespace chatServerAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/")]
    public class CrossServerController : ControllerBase
    {
        private IServiceMessages _messagesService;
        private IServiceUsers _usersService;
        //private readonly IHubContext<ChatHub> _hubContext;
        private string _myId;

        public CrossServerController(UsersContext usersContext, IHubContext<ChatHub> hub)
        {
            _messagesService = new ServiceMessages(usersContext);
            _usersService = new ServiceUsers(usersContext);
            //_hubContext = hub;
        }

        private void SetMyId()
        {
            string? loggedUser = HttpContext.User.FindFirst("username")?.Value;
            if (loggedUser != null)
            {
                _myId = loggedUser;
            }
        }
        
        
        // public async Task SendMessage(string username, string message, string time)
        // {
        //     string connectionId;
        //     if (_hubContext.ConnectionsDict.ContainsKey(username))
        //     {
        //         connectionId = _hubContext[username];
        //         await _hubContext.Client(connectionId).SendAsync("ReceiveMessage", username, message, time);
        // //     }
        // }

        /**
         * getting TransferApi object contains: from, to, content.
         * this query will arrive from the sender server,
         * so myID is transfer.to and the friend id is the transfer.from.
         */
        [HttpPost("transfer/")]
        public async Task<IActionResult> Transfer([FromBody] TransferApi transfer)
        {
            if (transfer.from == null || transfer.to == null)
            {
                return BadRequest();
            }

            //SetMyId(); // myId == transfer.to
            string fromId = transfer.from;
            string date = DateTime.Now.ToString("o");

            List<ContentApi>? listCon = _messagesService.GetConversation(transfer.to, fromId);
            ContentApi cont = new ContentApi() {Id = 1, Content = transfer.content, Created = date, Sent = false};
            if (listCon == null)
            {
                Conversation newConv = new Conversation()
                    {Contents = new List<ContentApi> {cont}, Id = 1, from = fromId, to = transfer.to};
                _messagesService.AddConv(newConv);
            }
            else
            {
                cont.Id = listCon.Last().Id + 1;
                _messagesService.AddContent(transfer.to, fromId, cont);
            }
            //update the last message in the contact list of the user
            _usersService.UpdateLastMessage(transfer.to,transfer.from,transfer.content,date);

            return Ok();
        }
        
        /**
         * getting InvitationApi object contains: from, to, content.
         * this query will arrive from the sender server,
         * hence myID is invitation.to and the friendID is invitation.from. 
         */
        [HttpPost("invitations/")]
        public async Task<IActionResult> Invitation([FromBody] InvitationApi invitation)
        {
            //check if the user exists in the userslist
            if (_usersService.Get(invitation.from) == null)
            {
                _usersService.Add(new User()
                {
                    Id = invitation.from, Name = invitation.from,
                    Password = null, Contacts = new List<ContactApi>()
                });
            }

            string contactId = invitation.from;
            string myId = invitation.to;

            ContactApi contact = new ContactApi()
            {
                Id = invitation.from, last = null, lastdate = null, Name = invitation.from,
                Server = invitation.server
            };

            _usersService.AddContact(myId, contact);


            Conversation conv = new Conversation()
            {
                Contents = new List<ContentApi>(), Id = _messagesService.GetLastConvId() + 1, from = myId,
                to = contactId
            };
            _messagesService.AddConv(conv);

            return Ok();
        }
    }
}