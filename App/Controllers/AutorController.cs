using App.Data;
using App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace App.Controllers
{

    /// <summary>
    /// Namjenjeno za CRUD operacije nad entitetom autor u bazi
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AutorController: ControllerBase
    {
        /// <summary>
        /// Kontest za rad s bazom koji će biti postavljen s pomoću Dependecy Injection-om
        /// </summary>
        private KuharicaContext _context;

        /// <summary>
        /// Konstruktor klase koja prima Kuharica kontext
        /// pomoću DI principa
        /// </summary>
        /// <param name="context"></param>
        public AutorController(KuharicaContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Dohvaća sve autore iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita
        /// 
        ///    GET api/v1/Autor
        ///    
        /// </remarks>
        /// <returns>Autori u bazi</returns>
        /// <response code="200">Sve OK, ako nema podataka content-length: 0 </response>
        /// <response code="400">Zahtjev nije valjan</response>
        /// <response code="503">Baza na koju se spajam nije dostupna</response>
        [HttpGet]
        public IActionResult Get()
        {
            // kontrola ukoliko upit nije valjan
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var autori = _context.Autori.ToList();
                if (autori == null || autori.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(autori);
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
                var autor = _context.Autori.Find(sifra);
                if (autor == null)
                {
                    return BadRequest("Autor s šifrom " + sifra + " ne postoji");
                }
                return new JsonResult(autor);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Dodaje novog autora u bazu
        /// </summary>
        /// <remarks>
        ///     POST api/v1/Autor
        ///     {naziv: "Primjer naziva"}
        /// </remarks>
        /// <param name="autor">Autor za unijeti u JSON formatu</param>
        /// <response code="201">Kreirano</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Baza nedostupna iz razno raznih razloga</response> 
        /// <returns>Smjer s šifrom koju je dala baza</returns>
        [HttpPost]
        public IActionResult Post(Autor autor)
        {
            if (!ModelState.IsValid || autor == null)
            {
                return BadRequest();
            }
            try
            {
                _context.Autori.Add(autor);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, autor);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Mijenja podatke postojećeg autora u bazi
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    PUT api/v1/autor/1
        ///
        /// {
        ///  "sifra": 0,
        ///  "ime": "Novo Ime",
        ///  "prezime": "Novo Prezime",
        ///  "email": " Novi Email",
        ///  "mjesto": " Novo Mjesto",
        ///  "drzava":" Nova Drzava"
        /// }
        ///
        /// </remarks>
        /// <param name="sifra">Šifra autora koji se mijenja</param>  
        /// <param name="autor">Autor za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od autora koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi autora kojeg želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response> 
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Autor autor)
        {
            if (sifra <= 0 || !ModelState.IsValid || autor == null)
            {
                return BadRequest();
            }
            try
            {


                var autorIzBaze = _context.Autori.Find(sifra);

                if (autorIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }


                // inače ovo rade mapperi
                // za sada ručno
                autorIzBaze.Ime = autor.Ime;
                autorIzBaze.Prezime = autor.Prezime;
                autorIzBaze.Email = autor.Email;
                autorIzBaze.Mjesto = autor.Mjesto;
                autorIzBaze.Drzava = autor.Drzava;

                _context.Autori.Update(autorIzBaze);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, autorIzBaze);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }

        /// <summary>
        /// Briše autora iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    DELETE api/v1/autor/1
        ///    
        /// </remarks>
        /// <param name="sifra">Šifra autora koji se briše</param>  
        /// <returns>Odgovor da li je obrisano ili ne</returns>
        /// <response code="200">Sve je u redu, obrisano je u bazi</response>
        /// <response code="204">Nema u bazi autora kojeg želimo obrisati</response>
        /// <response code="503">Problem s bazom</response> 
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
                var autorIzBase = _context.Autori.Find(sifra);

                if (autorIzBase == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Autori.Remove(autorIzBase);
                _context.SaveChanges();

                return new JsonResult("{\"poruka\": \"Obrisano\"}"); // ovo nije baš najbolja praksa ali da znake kako i to može

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }
    }
}
