using System.Collections.Generic;
using System.Linq;

namespace ReactPeople.Data
{
    public class PeopleRepository
    {
        private readonly string _connection;

        public PeopleRepository(string connection)
        {
            _connection = connection;
        }
        public List<Person> GetAll()
        {
            using var context = new PeopleContext(_connection);
            return context.People.ToList();
        }
        public void Add(Person person)
        {
            using var context = new PeopleContext(_connection);
            context.People.Add(person);
            context.SaveChanges();
        }
        public void Delete(Person person)
        {
            using var context = new PeopleContext(_connection);
            context.People.Remove(person);
            context.SaveChanges();
        }
        public void DeleteMultiple(List<Person> people)
        {
            using var context = new PeopleContext(_connection);
            foreach (var person in people)
            {
                context.People.Remove(person);
            }
            context.SaveChanges();
        }
        public void Update(Person person)
        {
            using var context = new PeopleContext(_connection);
            context.People.Update(person);
            context.SaveChanges();
        }

    }
}