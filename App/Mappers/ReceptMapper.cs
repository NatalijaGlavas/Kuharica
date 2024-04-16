using App.Models;
using AutoMapper;

namespace App.Mappers
{
    public class ReceptMapper
    {

        public static Mapper InicijalizirajReadToDTO()
        {
            return new Mapper(
            new MapperConfiguration(c =>
            {
                c.CreateMap<Recept, ReceptDTORead>()
                .ConstructUsing(entitet =>
                 new ReceptDTORead(
                    entitet.Sifra,
                    entitet.Naziv,
                    entitet.Autor == null ? "" : (entitet.Autor.Ime + " " + entitet.Autor.Prezime).Trim(),
                    entitet.Opis));
            })
            );
        }



        public static Mapper InicijalizirajInsertUpdateToDTO()
        {
            return new Mapper(
             new MapperConfiguration(c =>
             {
                 c.CreateMap<Recept, ReceptDTOInsertUpdate>()
                 .ConstructUsing(entitet =>
                  new ReceptDTOInsertUpdate(
                     entitet.Naziv,
                     entitet.Autor == null ? null : entitet.Autor.Sifra,
                     entitet.Opis));
             })
             );
        }


    }
}
