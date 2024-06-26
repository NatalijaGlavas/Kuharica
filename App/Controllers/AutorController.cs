﻿using App.Data;
using App.Extensions;
using App.Models;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AutorController: ControllerBase
    {
        private KuharicaContext _context;

        public AutorController(KuharicaContext context)
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
                var autori = _context.Autori.ToList();
                if (autori == null || autori.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(autori.MapAutorReadList());
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
                return new JsonResult(autor.MapAutorInsertUpdatedToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }


        [HttpPost]
        public IActionResult Post(AutorDTOInsertUpdate autorDTO)
        {
            if (!ModelState.IsValid || autorDTO == null)
            {
                return BadRequest();
            }
            try
            {
                var autor = autorDTO.MapAutorInsertUpdateFromDTO(new Autor());
                _context.Autori.Add(autor);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status201Created, autor.MapAutorReadToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }


        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, AutorDTOInsertUpdate autorDTO)
        {
            if (sifra <= 0 || !ModelState.IsValid || autorDTO == null)
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

                var autor = autorDTO.MapAutorInsertUpdateFromDTO(autorIzBaze);

                _context.Autori.Update(autor);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, autor.MapAutorReadToDTO());
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
                var autorIzBaze = _context.Autori.Find(sifra);

                if (autorIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Autori.Remove(autorIzBaze);
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
