using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class UsersContext
    {
        public List<User> usersList = new List<User>();

        public UsersContext()
        {
            Contact contact1 = new Contact()
                {Id = 2, lastMessage = "hey", lastTime = "2022-01-23T09:23:45.904Z"};
            Contact contact2 = new Contact()
                {Id = 3, lastMessage = "yo man?", lastTime = "2022-01-23T09:08:45.904Z"};
            User user1 = new User()
                {Id = 1, Email = "a@b", Name = "Peleg", Password = "2910", Contacts = new List<Contact>() {contact1, contact2}};
            usersList.Add(user1);
        }
    }
}