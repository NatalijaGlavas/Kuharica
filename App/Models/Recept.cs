﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models
{
    /// <summary>
    /// Ovo mi je POCO koji je mapiran na bazu
    /// </summary>
    public class Recept : Entitet
    {
        /// <summary>
        /// Naziv u bazi
        /// </summary>
        [Required(ErrorMessage = "Naziv obavezno")]
        public string? Naziv { get; set; }
        /// <summary>
        /// Autor u bazi
        /// </summary>
        [Required(ErrorMessage = "Naziv obavezno")]

        [ForeignKey("autor")]
        public Autor? Autor { get; set; }

        /// <summary>
        /// Opis u bazi
        /// </summary>
        [Required(ErrorMessage = "Naziv obavezno")]
        public string? Opis { get; set; }
        
    }
}
