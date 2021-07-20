using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCrudUsers.Models
{
    public class UserDataAccessLayer
    {
        DBContext db = new DBContext();

        public IEnumerable<Users> GetAllUsers()
        {
            try
            {
                return db.Users.ToList();
            }
            catch
            {
                throw;
            }
        }

        //To Add new User record   
        public int AddUser(Users User)
        {
            try
            {
                db.Users.Add(User);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar User  
        public int UpdateUser(Users User)
        {
            try
            {
                db.Entry(User).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular User  
        public Users GetUserData(int id)
        {
            try
            {
                Users User = db.Users.Find(id);
                return User;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular User  
        public int DeleteUser(int id)
        {
            try
            {
                Users emp = db.Users.Find(id);
                db.Users.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }


    }
}
