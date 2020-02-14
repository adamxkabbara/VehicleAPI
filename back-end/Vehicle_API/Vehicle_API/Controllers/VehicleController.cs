using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Vehicle_API
{
    [EnableCors("AllowAll")]
    [Route("api/vehicle")]
    public class VehicleController : Controller
    {
        static string strConnection = "server=mysql-vehicle-database-2.cqlskylpfxg7.us-east-1.rds.amazonaws.com;database=VehicleAPI;user=admin;password=database123database;port=3306";

        // GET: api/vehicle
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            MySqlConnection sqlConn = new MySqlConnection(strConnection);
            await sqlConn.OpenAsync();

            string sql = "SELECT * FROM Vehicle";
            MySqlCommand cmd = new MySqlCommand(sql, sqlConn);
            MySqlDataReader rdr = cmd.ExecuteReader();

            List<Vehicle> vehicles = new List<Vehicle>();
            while (rdr.Read())
            {
                //Vehicle vehicle = new Vehicle((int)rdr[0]), rdr[1].ToString()), rdr[2], rdr[3]);

                Vehicle vehicle = new Vehicle();
                vehicle.Id = (int)rdr[0];
                vehicle.Year = (int)rdr[1];
                vehicle.Make = (string)rdr[2];
                vehicle.Model = (string)rdr[3];

                vehicles.Add(vehicle);
            }
            await sqlConn.CloseAsync();

            return Ok(vehicles);
        }

        // GET api/vehicle/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
                
            MySqlConnection sqlConn = new MySqlConnection(strConnection);
            await sqlConn.OpenAsync();

            try
            {
                string sql = "SELECT * FROM Vehicle WHERE Id=" + id;
                MySqlCommand cmd = new MySqlCommand(sql, sqlConn);
                MySqlDataReader rdr = cmd.ExecuteReader();

                if (rdr.HasRows == false)
                {
                    return StatusCode(422);
                }
                Vehicle vehicle = new Vehicle();

                while (rdr.Read())
                {
                    vehicle.Id = (int)rdr[0];
                    vehicle.Year = (int)rdr[1];
                    vehicle.Make = (string)rdr[2];
                    vehicle.Model = (string)rdr[3];
                }

                await sqlConn.CloseAsync();

                return Ok(vehicle);
            }
            catch
            {
                await sqlConn.CloseAsync();

                return NotFound();
            }

        }

        [HttpOptions]
        public void Option([FromBody]Vehicle vehicle)
        {
            Response.Headers.Add("Access-Control-Allow-Methods",  "GET, POST, DELETE, PUT, OPTIONS");
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            return;
        }

        // POST api/vehicle
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Vehicle vehicle)
        {
            if (vehicle.Year > 2050 || vehicle.Year < 1950)
            {
                return StatusCode(422);
            }
            
            MySqlConnection sqlConn = new MySqlConnection(strConnection);
            await sqlConn.OpenAsync();

            try
            {
                string sql = "INSERT INTO Vehicle (Id, Year, Make, Model) VALUES (" + vehicle.Id + ", " + vehicle.Year + ", \"" + vehicle.Make + "\", \"" + vehicle.Model + "\")";
                MySqlCommand cmd = new MySqlCommand(sql, sqlConn);
                cmd.ExecuteNonQuery();

                sqlConn.Close();

                return Ok();
            }
            catch
            {
                await sqlConn.CloseAsync();

                return NotFound();
            }
            
        }

        // PUT api/vehicle/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]Vehicle vehicle)
        {
            MySqlConnection sqlConn = new MySqlConnection(strConnection);
            await sqlConn.OpenAsync();

            try
            {
                //string sql = "UPDATE Vehicle SET Year=" + vehicle.Year + ", Make=" + vehicle.Make + ", Model=" + vehicle.Model + " WHERE Id=" + id;
                string sql = "UPDATE Vehicle SET Year=" + vehicle.Year + ", Make=\"" + vehicle.Make + "\", Model=\"" + vehicle.Model + "\" WHERE Id=" + id;

                MySqlCommand cmd = new MySqlCommand(sql, sqlConn);
                cmd.ExecuteNonQuery();

                sqlConn.Close();

                return Ok();
            }
            catch
            {
                await sqlConn.CloseAsync();

                return BadRequest();
            }
           
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            MySqlConnection sqlConn = new MySqlConnection(strConnection);
            await sqlConn.OpenAsync();

            try
            {
                string sql = "DELETE FROM Vehicle WHERE Id=" + id;
                MySqlCommand cmd = new MySqlCommand(sql, sqlConn);
                cmd.ExecuteNonQuery();

                await sqlConn.CloseAsync();

                return Ok();
            }
            catch
            {
                await sqlConn.CloseAsync();

                return BadRequest();
            }
        }
    }
}
