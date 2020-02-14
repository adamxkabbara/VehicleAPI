using System;
using Microsoft.EntityFrameworkCore;
using MySql.Data.EntityFrameworkCore.Extensions;
using Vehicle_API;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vehicle_API
{
    public class VehicleContext : DbContext
    {
        public DbSet<Vehicle> Vehicle { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("server=127.0.0.1;database=VehicleAPI;user=root;password=Sony2011;port=3306");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        
            modelBuilder.Entity<Vehicle>(entity =>
            {
                entity.Property(e => e.Id);
                entity.Property(e => e.Year).IsRequired();
                entity.Property(e => e.Make).IsRequired();
                entity.Property(e => e.Model).IsRequired();
            });
        
        }
        
        
    }
}