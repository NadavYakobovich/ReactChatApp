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
                Id = 2, last = "hey", lastdate = "2022-01-23T09:21:13.904Z", Name = "Nadav Yakobovich",
                Server = "localhost:7266"
            };
            ContactApi contact2 = new ContactApi()
            {
                Id = 3, last = "thanksssssss", lastdate = "2022-01-23T09:23:12.904Z", Name = "itamar bahcher",
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
                Id = 1, last = "thanks", lastdate = "2022-01-23T09:23:05.904Z", Name = "Peleg Shlomo",
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
                Id = 1, last = "thanksssssss", lastdate = "2022-01-23T09:23:22.904Z", Name = "Peleg Shlomo",
                Server = "localhost:7886"
            };
            User user3 = new User()
            {
                Id = 3, Email = "whashab@gmail.com", Name = "itamar", Password = "1111111",
                Contacts = new List<ContactApi>() {contact1}
            };

            usersList.Add(user3);

            //conversation1

            //from peleg to nadav
            ContentApi conten1 = new ContentApi() {Content = "hi how are you? this is nadav?>", Created = "2022-01-23T09:23:15.904Z", Id = 1, Sent = true};
            ContentApi conten2 = new ContentApi()
                {Content = "i am great Thanks", Created = "2022-01-23T09:23:25.904Z", Id = 2, Sent = false};
            ContentApi conten3 = new ContentApi() {Content = "cool!", Created = "2022-01-23T09:23:35.904Z", Id = 3, Sent = true};

            Conversation conv1 = new Conversation()
                {Contents = new List<ContentApi>() {conten1, conten2, conten3}, Id = 1, user = 1, contact = 2};
            
            Conversations.Add(conv1);
            
            //from nadav to peleg
            ContentApi conten12 = new ContentApi() {Content = "hi how are you? this is nadav?>", Created = "2022-01-23T09:23:15.904Z", Id = 1, Sent = false};
            ContentApi conten22 = new ContentApi()
                {Content = "i am great Thanks", Created = "2022-01-23T09:23:25.904Z", Id = 2, Sent = true};
            ContentApi conten32 = new ContentApi() {Content = "cool!", Created = "2022-01-23T09:23:35.904Z", Id = 3, Sent = false};

            Conversation conv12 = new Conversation()
                {Contents = new List<ContentApi>() {conten12, conten22, conten32}, Id = 1, user = 2, contact = 1};
            
            Conversations.Add(conv12);
            
            //from peleg to itmar
            ContentApi conten1friend31 = new ContentApi() {Content = "hi how are you? i am itamr", Created = "2022-01-23T09:23:15.904Z", Id = 1, Sent = true};
            ContentApi conten2friend32 = new ContentApi()
                {Content = "i am great Thanks", Created = "2022-01-23T09:23:25.904Z", Id = 2, Sent = false};
            ContentApi conten3friend33 = new ContentApi() {Content = "cool!", Created = "2022-01-23T09:23:35.904Z", Id = 3, Sent = true};
            
            Conversation conv2 = new Conversation()
                {Contents = new List<ContentApi>() {conten1friend31, conten2friend32, conten3friend33}, Id = 2, user = 1, contact = 3};
            Conversations.Add(conv2);
            
            //from  itamar to peleg
            ContentApi conten1friend322 = new ContentApi() {Content = "hi how are you? i am itamr", Created = "2022-01-23T09:23:15.904Z", Id = 1, Sent = true};
            ContentApi conten2friend322 = new ContentApi()
                {Content = "i am great Thanks", Created = "2022-01-23T09:23:25.904Z", Id = 2, Sent = false};
            ContentApi conten3friend322 = new ContentApi() {Content = "cool!", Created = "2022-01-23T09:23:35.904Z", Id = 3, Sent = true};
            
            Conversation conv22 = new Conversation()
                {Contents = new List<ContentApi>() {conten1friend322, conten2friend322, conten3friend322}, Id = 2, user = 1, contact = 3};
            Conversations.Add(conv22);

        }
    }
}