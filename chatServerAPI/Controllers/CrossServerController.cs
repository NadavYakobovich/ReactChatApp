using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.apiDomain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        private int _myId;

        public CrossServerController(UsersContext usersContext)
        {
            _messagesService = new ServiceMessages(usersContext);
            _usersService = new ServiceUsers(usersContext);
        }

        private void SetMyId()
        {
            string? loggedUser = HttpContext.User.FindFirst("username")?.Value;
            if (loggedUser != null)
            {
                _myId = _usersService.GetIdByEmail(loggedUser);
            }
        }

        [HttpPost("transfer/")]
        public async Task<ActionResult> Transfer([FromBody] TransferApi transfer)
        {
            if (transfer.from == null || transfer.to == null)
            {
                return BadRequest();
            }

            SetMyId(); // myId == transfer.to
            int fromId = _usersService.GetIdByName(transfer.from);
            string date = DateTime.Now.ToString("o");

            List<ContentApi>? listCon = _messagesService.GetConversation(_myId, fromId);
            ContentApi cont = new ContentApi() {Id = 1, Content = transfer.content, Created = date, Sent = false};
            if (listCon == null)
            {
                Conversation newConv = new Conversation()
                    {Contents = new List<ContentApi> {cont}, Id = 1, user = fromId, contact = _myId};
                _messagesService.AddConv(newConv);
            }
            else
            {
                cont.Id = listCon.Last().Id + 1;
                _messagesService.AddContent(_myId, fromId, cont);
            }

            return Ok();
        }
    }
}