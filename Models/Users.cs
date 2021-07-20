using System;
using System.Collections.Generic;

namespace ReactCrudUsers.Models
{
    public partial class Users
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
    }
}
