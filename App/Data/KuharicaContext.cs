using App.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;

namespace App.Data
{
    /// <summary>
    /// Ovo mi je datoteka gdje ću navoditi datasetove i načine spajanja u bazi
    /// </summary>
    public class KuharicaContext:DbContext
    {
        /// <summary>
        /// Kostruktor
        /// </summary>
        /// <param name="options"></param>
        public KuharicaContext(DbContextOptions<KuharicaContext> options)
            : base(options)
        {

        }
        /// <summary>
        /// Autori u bazi
        /// </summary>
        public DbSet<Autor> Autori { get; set; }

        /// <summary>
        /// Recepti u bazi
        /// </summary>
        public DbSet<Recept> Recepti { get; set; }
     

    }
}
