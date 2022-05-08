using Microsoft.EntityFrameworkCore;
using System;

namespace ReactPeople.Data
{
    public class PeopleContext : DbContext
    { 
            private readonly string _connectionString;

            public PeopleContext(string connectionString)
            {
                _connectionString = connectionString;
            }

            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
                optionsBuilder.UseSqlServer(_connectionString);
            }

            public DbSet<Person> People { get; set; }
        }
}
