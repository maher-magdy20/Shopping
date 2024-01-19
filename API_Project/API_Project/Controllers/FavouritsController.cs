using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Project.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Text.Json;
using API_Project.ViewModel;
using AutoMapper;

namespace API_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FavouritsController : ControllerBase
    {
        private readonly AlaslyFactoryContext _context;
        private IMapper _Maper { get; set; }

        public FavouritsController(AlaslyFactoryContext context,IMapper maper)
        {
            _context = context;
            _Maper = maper;
        }

        // GET: api/Favourits
        [HttpGet]
        public async Task<ActionResult <IEnumerable<ProductVM>>> GetFavourits()
        {
             
            string UserName = User.FindFirstValue(ClaimTypes.Name);
            var user_id = _context.AspNetUsers.Where(U => U.UserName == UserName).Select(U => U.Id).FirstOrDefault();

            List<Favourit> items = _context.Favourits.Where(p => p.UserID == user_id).ToList();
            List<ProductVM> products = new List<ProductVM>();
            foreach (var item in items)
            {
                ProductVM p =_Maper.Map<ProductVM>(_context.Products.FirstOrDefault(p => p.ID == item.ProductID));
                products.Add(p);
            }
            
            return  products;
        }

        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Favourit>> PostFavourit(int ProductID)
        {
            string UserName = User.FindFirstValue(ClaimTypes.Name);
            var user_id = _context.AspNetUsers.Where(U => U.UserName == UserName).Select(U => U.Id).FirstOrDefault();
            Favourit favourit = new Favourit
            {
                UserID = user_id,
                ProductID = ProductID};
             _context.Favourits.Add(favourit);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FavouritExists(favourit.ProductID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFavourit", new { id = favourit.ProductID }, favourit);
        }

        // DELETE: api/Favourits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavourit(int id)
        {
            string UserName = User.FindFirstValue(ClaimTypes.Name);
            var user_id = _context.AspNetUsers.Where(U => U.UserName == UserName).Select(U => U.Id).FirstOrDefault();
            Favourit favourit = await _context.Favourits.FirstAsync(f=>f.UserID==user_id&&f.ProductID==id);
            if (favourit == null)
            {
                return NotFound();
            }
            _context.Favourits.Remove(favourit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FavouritExists(int id)
        {
            return _context.Favourits.Any(e => e.ProductID == id);
        }
    }
}
