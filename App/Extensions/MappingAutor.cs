using App.Mappers;
using App.Models;

namespace App.Extensions
{
    public static class MappingAutor
    {

        public static List<AutorDTORead> MapAutorReadList(this List<Autor> lista)
        {
            var mapper = AutorMapper.InicijalizirajReadToDTO();
            var vrati = new List<AutorDTORead>();
            lista.ForEach(e => {
                vrati.Add(mapper.Map<AutorDTORead>(e));
            });
            return vrati;
        }

        public static AutorDTORead MapAutorReadToDTO(this Autor entitet)
        {
            var mapper = AutorMapper.InicijalizirajReadToDTO();
            return mapper.Map<AutorDTORead>(entitet);
        }

        public static AutorDTOInsertUpdate MapAutorInsertUpdatedToDTO(this Autor entitet)
        {
            var mapper = AutorMapper.InicijalizirajInsertUpdateToDTO();
            return mapper.Map<AutorDTOInsertUpdate>(entitet);
        }

        public static Autor MapAutorInsertUpdateFromDTO(this AutorDTOInsertUpdate dto, Autor entitet)
        {
            entitet.Ime = dto.ime;
            entitet.Prezime = dto.prezime;
            entitet.Email= dto.email;
            entitet.Mjesto= dto.mjesto;
            entitet.Drzava = dto.drzava;
            return entitet;
        }

    }
}
