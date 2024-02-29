using App.Data;
using App.Models;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers
{
    /// <summary>
    /// Namjenjeno za CRUD operacije nad entitetom recept u bazi
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ReceptController: ControllerBase
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
        public ReceptController(KuharicaContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Dohvaća sve recepte iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita
        /// 
        ///    GET api/v1/Recept
        ///    
        /// </remarks>
        /// <returns>Recepti u bazi</returns>
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
                var recepti = _context.Recepti.ToList();
                if (recepti == null || recepti.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(recepti);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Dodaje novog recepta u bazu
        /// </summary>
        /// <remarks>
        ///     POST api/v1/Recept
        ///     {naziv: "Primjer naziva"}
        /// </remarks>
        /// <param name="recept">Recept za unijeti u JSON formatu</param>
        /// <response code="201">Kreirano</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Baza nedostupna iz razno raznih razloga</response> 
        /// <returns>Recept s šifrom koju je dala baza</returns>
        [HttpPost]
        public IActionResult Post(Recept recept)
        {
            if (!ModelState.IsValid || recept == null)
            {
                return BadRequest();
            }
            try
            {
                _context.Recepti.Add(recept);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, recept);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Mijenja podatke postojećeg recepta u bazi
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    PUT api/v1/recept/1
        ///
        /// {
        ///  "sifra": 0,
        ///  "naziv": "Novoi Naziv",
        ///  "autor": "Novoi Autor",
        ///  "opis": " Novi Opis",
        /// }
        ///
        /// </remarks>
        /// <param name="sifra">Šifra recepta koji se mijenja</param>  
        /// <param name="recept">Recept za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od recepta koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi recepta kojeg želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response> 
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Recept recept)
        {
            if (sifra <= 0 || !ModelState.IsValid || recept == null)
            {
                return BadRequest();
            }
            try
            {


                var receptIzBase = _context.Recepti.Find(sifra);

                if (receptIzBase == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }


                // inače ovo rade mapperi
                // za sada ručno
               receptIzBase.Naziv = recept.Naziv;
               receptIzBase.Autor = recept.Autor;
                receptIzBase.Opis = recept.Opis;
                

                _context.Recepti.Update(receptIzBase);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, receptIzBase);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }

        /// <summary>
        /// Briše recept iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    DELETE api/v1/recept/1
        ///    
        /// </remarks>
        /// <param name="sifra">Šifra recepta koji se briše</param>  
        /// <returns>Odgovor da li je obrisano ili ne</returns>
        /// <response code="200">Sve je u redu, obrisano je u bazi</response>
        /// <response code="204">Nema u bazi recepta kojeg želimo obrisati</response>
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
                var receptiIzBase = _context.Recepti.Find(sifra);

                if (receptiIzBase == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Recepti.Remove(receptiIzBase);
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
