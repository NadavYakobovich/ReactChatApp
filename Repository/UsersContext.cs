using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.apiDomain;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class UsersContext
    {
        public List<User> usersList = new List<User>();
        public List<Conversation> Conversations = new List<Conversation>();

        public UsersContext()
        {
            ContactApi contact1 = new ContactApi()
            {
                Id = 2, last = "hey", lastdate = "2022-01-23T09:23:45.904Z", Name = "Nadav Yakobovich",
                Server = "localhost:7266"
            };
            ContactApi contact2 = new ContactApi()
            {
                Id = 3, last = "thanksssssss", lastdate = "2022-01-23T09:23:45.904Z", Name = "Peleg Shlomo",
                Server = "localhost:7386"
            };
            User user1 = new User()
            {
                Id = 1, Email = "a@b", Name = "Peleg", Password = "2910",
                Contacts = new List<ContactApi>() {contact1, contact2}
            };

            usersList.Add(user1);

            contact1 = new ContactApi()
            {
                Id = 1, last = "thanks", lastdate = "2022-01-23T09:23:45.904Z", Name = "Peleg Shlomo",
                Server = "localhost:7286"
            };
            User user2 = new User()
            {
                Id = 2, Email = "12@3", Name = "Nadav", Password = "1234",
                Contacts = new List<ContactApi>() {contact1}
            };

            usersList.Add(user2);


            contact1 = new ContactApi()
            {
                Id = 1, last = "thanksssssss", lastdate = "2022-01-23T09:23:45.904Z", Name = "Peleg Shlomo",
                Server = "localhost:7886"
            };
            User user3 = new User()
            {
                Id = 3, Email = "whashab@gmail.com", Name = "itamar", Password = "1111111",
                Contacts = new List<ContactApi>() {contact1}
            };

            usersList.Add(user3);

            //conversation1

            ContentApi conten1 = new ContentApi() {Content = "hi how are you?", Created = "14:30", Id = 1, Sent = true};
            ContentApi conten2 = new ContentApi()
                {Content = "i am great Thanks", Created = "14:35", Id = 2, Sent = false};
            ContentApi conten3 = new ContentApi() {Content = "cool!", Created = "14:40", Id = 3, Sent = true};

            Conversation conv1 = new Conversation()
                {Contents = new List<ContentApi>() {conten1, conten2, conten3}, Id = 1, Id1 = 1, Id2 = 2};

            Conversations.Add(conv1);
        }
    }
}