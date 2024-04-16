using App.Data;
using App.Models;
using App.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace App.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ReceptController : ControllerBase
    {
        private KuharicaContext _context;

        public ReceptController(KuharicaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var lista = _context.Recepti
                    .Include(r => r.Autor)
                    .ToList();

                if (lista == null || lista.Count == 0)
                {
                    return new EmptyResult();
                }

                return new JsonResult(lista.MapReceptReadList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }


        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            // kontrola ukoliko upit nije valjan
            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var p = _context.Recepti
                    .Include(i => i.Autor)
                    .FirstOrDefault(x => x.Sifra == sifra);
                if (p == null)
                {
                    return new EmptyResult();
                }
                return new JsonResult(p.MapReceptInsertUpdatedToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }


        [HttpPost]
        public IActionResult Post(ReceptDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid || dto == null)
            {
                return BadRequest();
            }

            var autor = _context.Autori.Find(dto.autorSifra);

            if (autor == null)
            {
                return BadRequest();
            }

            var entitet = dto.MapReceptInsertUpdateFromDTO(new Recept());
            entitet.Autor = autor;

            try
            {
                _context.Recepti.Add(entitet);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, entitet.MapReceptReadToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }


        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, ReceptDTOInsertUpdate dto)
        {
            if (sifra <= 0 || !ModelState.IsValid || dto == null)
            {
                return BadRequest();
            }
            try
            {
                var entitet = _context.Recepti
                    .Include(i => i.Autor)
                    .FirstOrDefault(x => x.Sifra == sifra);

                if (entitet == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                var autor = _context.Autori.Find(dto.autorSifra);

                if (autor == null)
                {
                    return BadRequest();
                }

                entitet = dto.MapReceptInsertUpdateFromDTO(entitet);

                entitet.Autor = autor;

                _context.Recepti.Update(entitet);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, entitet.MapReceptReadToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }


        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest();
            }

            try
            {
                var entitetIzBaze = _context.Recepti.Find(sifra);

                if (entitetIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Recepti.Remove(entitetIzBaze);
                _context.SaveChanges();

                return new JsonResult("{\"poruka\": \"Obrisano\"}");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }
    }
}
