using EdunovaAPP.Data;
using EdunovaAPP.Mappers;
using EdunovaAPP.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace EdunovaAPP.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class GrupaController : EdunovaController<Grupa, GrupaDTORead, GrupaDTOInsertUpdate>
    {
        public GrupaController(EdunovaContext context) : base(context)
        {
            DbSet = _context.Grupe;
            _mapper = new MappingGrupa();
        }




        [HttpGet]
        [Route("Polaznici/{sifraGrupe:int}")]
        public IActionResult GetPolaznici(int sifraGrupe)
        {
            // kontrola ukoliko upit nije valjan
            if (!ModelState.IsValid || sifraGrupe <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var p = _context.Grupe
                    .Include(i => i.Polaznici).FirstOrDefault(x => x.Sifra == sifraGrupe);
                if (p == null)
                {
                    return BadRequest("Ne postoji grupa s šifrom " + sifraGrupe + " u bazi");
                }
                var mapping = new MappingPolaznik();
                return new JsonResult(mapping.MapReadList(p.Polaznici));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




        [HttpPost]
        [Route("{sifra:int}/dodaj/{polaznikSifra:int}")]
        public IActionResult DodajPolaznika(int sifra, int polaznikSifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (sifra <= 0 || polaznikSifra <= 0)
            {
                return BadRequest("Šifra grupe ili polaznika ije dobra");
            }

            try
            {

                var grupa = _context.Grupe
                    .Include(g => g.Polaznici)
                    .FirstOrDefault(g => g.Sifra == sifra);

                if (grupa == null)
                {
                    return BadRequest("Ne postoji grupa s šifrom " + sifra + " u bazi");
                }

                var polaznik = _context.Polaznici.Find(polaznikSifra);

                if (polaznik == null)
                {
                    return BadRequest("Ne postoji polaznik s šifrom " + polaznikSifra + " u bazi");
                }

                grupa.Polaznici.Add(polaznik);

                _context.Grupe.Update(grupa);
                _context.SaveChanges();

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(
                       StatusCodes.Status503ServiceUnavailable,
                       ex.Message);

            }

        }



        [HttpDelete]
        [Route("{sifra:int}/obrisi/{polaznikSifra:int}")]
        public IActionResult ObrisiPolaznika(int sifra, int polaznikSifra)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (sifra <= 0 || polaznikSifra <= 0)
            {
                return BadRequest("Šifra grupe ili polaznika nije dobra");
            }

            try
            {

                var grupa = _context.Grupe
                    .Include(g => g.Polaznici)
                    .FirstOrDefault(g => g.Sifra == sifra);

                if (grupa == null)
                {
                    return BadRequest("Ne postoji grupa s šifrom " + sifra + " u bazi");
                }

                var polaznik = _context.Polaznici.Find(polaznikSifra);

                if (polaznik == null)
                {
                    return BadRequest("Ne postoji polaznik s šifrom " + polaznikSifra + " u bazi");
                }


                grupa.Polaznici.Remove(polaznik);

                _context.Grupe.Update(grupa);
                _context.SaveChanges();

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }

        }


        protected override void KontrolaBrisanje(Grupa entitet)
        {
            if (entitet!=null && entitet.Polaznici != null && entitet.Polaznici.Count() > 0)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("Grupa se ne može obrisati jer su na njon polaznici: ");
                foreach (var e in entitet.Polaznici)
                {
                    sb.Append(e.Ime).Append(" ").Append(e.Prezime).Append(", ");
                }

                throw new Exception(sb.ToString().Substring(0, sb.ToString().Length - 2));
            }
        }

        protected override Grupa KreirajEntitet(GrupaDTOInsertUpdate dto)
        {
            var smjer = _context.Smjerovi.Find(dto.smjerSifra) ?? throw new Exception("Ne postoji smjer s šifrom " + dto.smjerSifra + " u bazi");
            var predavac = _context.Predavaci.Find(dto.predavacSifra) ?? throw new Exception("Ne postoji predavač s šifrom " + dto.predavacSifra + " u bazi");
            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Polaznici = new List<Polaznik>();
            entitet.Smjer = smjer;
            entitet.Predavac = predavac;
            return entitet;
        }

        protected override List<GrupaDTORead> UcitajSve()
        {
            var lista = _context.Grupe
                    .Include(g => g.Smjer)
                    .Include(g => g.Predavac)
                    .Include(g => g.Polaznici)
                    .ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return  _mapper.MapReadList(lista);
        }

        protected override Grupa NadiEntitet(int sifra)
        {
            return _context.Grupe.Include(i => i.Smjer).Include(i => i.Predavac)
                    .Include(i => i.Polaznici).FirstOrDefault(x => x.Sifra == sifra) ?? throw new Exception("Ne postoji grupa s šifrom " + sifra + " u bazi");
        }



        protected override Grupa PromjeniEntitet(GrupaDTOInsertUpdate dto, Grupa entitet)
        {
            var smjer = _context.Smjerovi.Find(dto.smjerSifra) ?? throw new Exception("Ne postoji smjer s šifrom " + dto.smjerSifra + " u bazi");
            var predavac = _context.Predavaci.Find(dto.predavacSifra) ?? throw new Exception("Ne postoji predavač s šifrom " + dto.predavacSifra + " u bazi");


            /*
            List<Polaznik> polaznici = entitet.Polaznici;
            entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Polaznici = polaznici;
            */

            // ovdje je možda pametnije ići s ručnim mapiranje
            entitet.MaksimalnoPolaznika = dto.maksimalnopolaznika;
            entitet.DatumPocetka = dto.datumpocetka;
            entitet.Naziv = dto.naziv;
            entitet.Smjer = smjer;
            entitet.Predavac = predavac;
            
            return entitet;
        }
    }
}
