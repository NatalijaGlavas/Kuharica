using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;

namespace App.Models
{
    public record AutorDTORead(
        int sifra,
        string ime,
        string prezime,
        string email, 
        string mjesto,
        string drzava);

    public record AutorDTOInsertUpdate(
        string ime,
        string prezime,
        string email,
        string mjesto,
        string drzava);


    public record ReceptDTORead(
        int sifra,
        string? naziv,
        string? autorImePrezime,
        string? opis);

    public record ReceptDTOInsertUpdate(
        string? naziv,
        int? autorSifra,
        string? opis);



}
