﻿using Domain;
using Domain.apiDomain;

namespace Services;

public interface IServiceUsers
{
    //CRUD -> Create   Read      Update   Delete
    //        Add      GetUser   Update   Delete
    //                 GetAll

    public void Add(User user);

    public IEnumerable<User> GetAll();

    public User Get(int id);

    public void Update(int id);

    public void Delete(int id);
    public void AddContact(int id, ContactApi content);
    
    

}