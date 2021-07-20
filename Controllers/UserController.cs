using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactCrudUsers.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactCrudUsers.Controllers
{
    public class UserController : Controller
    {
        UserDataAccessLayer objUser = new UserDataAccessLayer();

        [HttpGet]
        [Route("api/User/Index")]
        public IEnumerable<Users> Index()
        {
            return objUser.GetAllUsers();
        }

        [HttpPost]
        [Route("api/User/Create")]
        public int Create(Users User)
        {
            return objUser.AddUser(User);
        }

        [HttpGet]
        [Route("api/User/Details/{id}")]
        public Users Details(int id)
        {
            return objUser.GetUserData(id);
        }

        [HttpPut]
        [Route("api/User/Edit")]
        public int Edit(Users User)
        {
            return objUser.UpdateUser(User);
        }

        [HttpDelete]
        [Route("api/User/Delete/{id}")]
        public int Delete(int id)
        {
            return objUser.DeleteUser(id);
        }

    }
}
