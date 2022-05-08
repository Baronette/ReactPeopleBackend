using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPeople.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPeople.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Peoplecontroller : ControllerBase
    {
        private string _connection;
        public Peoplecontroller(IConfiguration configuration)
        {
            _connection = configuration.GetConnectionString("constr");
        }
        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PeopleRepository(_connection);
            return repo.GetAll();
        }
        [Route("add")]
        [HttpPost]
        public void Add(Person person)
        {
            var repo = new PeopleRepository(_connection);
            repo.Add(person);
        }
        [Route("delete")]
        [HttpPost]
        public void Delete(Person person)
        {
            var repo = new PeopleRepository(_connection);
            repo.Delete(person);
        }
        [Route("deletemultiple")]
        [HttpPost]
        public void DeleteMultiple(List<Person> people)
        {
            var repo = new PeopleRepository(_connection);
            repo.DeleteMultiple(people);
        }
        [Route("update")]
        [HttpPost]
        public void Update(Person person)
        {
            var repo = new PeopleRepository(_connection);
            repo.Update(person);
        }

    }
}
