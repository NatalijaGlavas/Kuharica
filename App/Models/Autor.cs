using System.ComponentModel.DataAnnotations;

namespace App.Models
{
    // ORM čitati:https://github.com/tjakopec/ORM_JAVA_PHP_CSHARP

    /// <summary>
    /// Ovo mi je POCO koji je mapiran na bazu
    /// </summary>
    public class Autor:Entitet
    {
        /// <summary>
        /// Ime u bazi
        /// </summary>
        [Required(ErrorMessage = "Naziv obavezno")]
        public string? Ime { get; set; }
        /// <summary>
        /// Prezime u bazi
        /// </summary>
        [Required(ErrorMessage = "Naziv obavezno")]
        public string? Prezime { get; set; }

        /// <summary>
        /// Email u bazi
        /// </summary>
        [Required(ErrorMessage = "Naziv obavezno")]
        public string? Email { get; set; }
        /// <summary>
        /// Mjesto u bazi
        /// </summary>
        [Required(ErrorMessage = "Naziv obavezno")]
        public string? Mjesto { get; set; }
        /// <summary>
        /// Drzava u bazi
        /// </summary>
        [Required(ErrorMessage = "Naziv obavezno")]
        public string? Drzava { get; set; }
    }
}
