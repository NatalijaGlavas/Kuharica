using App.Mappers;
using App.Models;

namespace App.Extensions
{
    public static class MappingRecept
    {
        public static List<ReceptDTORead> MapReceptReadList(this List<Recept> lista)
        {
            var mapper = ReceptMapper.InicijalizirajReadToDTO();
            var vrati = new List<ReceptDTORead>();
            lista.ForEach(e => {
                vrati.Add(mapper.Map<ReceptDTORead>(e));
            });

            return vrati;
        }

        public static ReceptDTORead MapReceptReadToDTO(this Recept entitet)
        {
            var mapper = ReceptMapper.InicijalizirajReadToDTO();
            return mapper.Map<ReceptDTORead>(entitet);
        }

        public static ReceptDTOInsertUpdate MapReceptInsertUpdatedToDTO(this Recept entitet)
        {
            var mapper = ReceptMapper.InicijalizirajInsertUpdateToDTO();
            return mapper.Map<ReceptDTOInsertUpdate>(entitet);
        }

        public static Recept MapReceptInsertUpdateFromDTO(this ReceptDTOInsertUpdate dto, Recept entitet)
        {
            entitet.Naziv = dto.naziv;
            entitet.Opis = dto.opis;

            return entitet;
        }
    }
}
