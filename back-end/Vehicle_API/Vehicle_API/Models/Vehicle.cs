using System;

namespace Vehicle_API
{
    public class Vehicle
    {
        public Vehicle() { }
        public Vehicle(int Id, int Year, string Make, string Model) {
            this.Id = Id;
            this.Year = Year;
            this.Make = Make;
            this.Model = Model;
        }
        public int Id { get; set; }
        public int Year { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
    }
}
