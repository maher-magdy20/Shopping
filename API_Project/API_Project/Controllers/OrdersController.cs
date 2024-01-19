using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Project.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using API_Project.ViewModel;

namespace API_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly AlaslyFactoryContext _context;

        public OrdersController(AlaslyFactoryContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            string UserName = User.FindFirstValue(ClaimTypes.Name);
            var user_id = _context.AspNetUsers.Where(U => U.UserName == UserName).Select(U => U.Id).FirstOrDefault();
            return await _context.Orders.Where(o=>o.UserID=="1"&&o.status==1||o.status==2||o.status==0).ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        //public async Task<ActionResult<Order>> GetOrder(int id)
        //{
        //    var order = await _context.Orders.FindAsync(id);

        //    if (order == null)
        //    {
        //        return NotFound();
        //    }

        //    return order;
        //}

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutOrder(int id, Order order)
        //{
        //    if (id != order.ID)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(order).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!OrderExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(DtailsOrder oorder)
        {
            string UserName = User.FindFirstValue(ClaimTypes.Name);
            var user_id = _context.AspNetUsers.Where(U => U.UserName == UserName).Select(U => U.Id).FirstOrDefault();
            Order order = new Order();
            Cart c1 = _context.Carts.FirstOrDefault(c => c.UserID == user_id);
            if(c1!=null)
            {

                order.status = 1;
                order.UserID = user_id;
                order.CartID = c1.ID;
                order.Address = oorder.Address;
                order.Phone = oorder.Phone;
                ////////////////////////////////////////////////botros
                ///
                int CartIDD = c1.ID;
                var ListOfProduct = _context.Product_In_Carts.Where(p => p.CartID == CartIDD).ToList();
                CartDetalisMV cartview = new CartDetalisMV();
                List<ProductCartMV> ProductsVCartt = new List<ProductCartMV>();
                cartview.ProductsVCart = ProductsVCartt;


                cartview.TotalCartPrice = 0;
                foreach (var item in ListOfProduct)
                {

                    ProductVM productVMM = new ProductVM();
                    productVMM.Quntity = item.quantity;
                    productVMM.ID = item.ProductID;
                    var product = _context.Products.FirstOrDefault(p => p.ID == item.ProductID);
                    productVMM.Name = product.Name;
                    productVMM.CategoryID = product.CategoryID;
                    var categoryT = _context.Categories.FirstOrDefault(c => c.ID == product.CategoryID);
                    productVMM.Category = categoryT.Name;
                    productVMM.SeasonID = product.SeasonID;
                    var seassonT = _context.Seasons.FirstOrDefault(s => s.ID == product.SeasonID);
                    productVMM.Season = seassonT.Name;
                    productVMM.Price = (double)(product.Price - product.Discount);
                    productVMM.Description = product.Description;
                    productVMM.TypeID = product.TypeID;
                    var TypeT = _context.Types.FirstOrDefault(T => T.ID == product.TypeID);
                    productVMM.Type = TypeT.Name;
                    productVMM.FirstImage = _context.ProductImages
                            .Where(P => P.ProductID == item.ProductID)
                            .Select(p => p.ImagePath).FirstOrDefault();
                    //productVMM.Images = _context.ProductImages
                    //        .Where(P => P.ProductID == item.ProductID)
                    //        .Select(p => p.ImagePath).ToList();
                    //productVMM.ShowInHome = true;
                    productVMM.Discount = product.Discount;






                    //product should appear on cart
                    ProductCartMV productCartMVV = new ProductCartMV();
                    productCartMVV.ProductVM = productVMM;
                    productCartMVV.QuntityOfProduct = productVMM.Quntity;
                    productCartMVV.TotalPrice = (int)(productCartMVV.QuntityOfProduct * productVMM.Price);


                    //cart detalis vew
                    cartview.TotalCartPrice += productCartMVV.TotalPrice;
                    /* cartview.ProductsVCart.Add(productCartMVV);*/
                    ProductsVCartt.Add(productCartMVV);

                }
                /////////////////////////////////
                order.TotalPrice = cartview.TotalCartPrice;
                order.PaymentMethod = true;
               // order.Cart = null;
                _context.Orders.Add(order);
               // _context.Carts.Remove(c1);
                await _context.SaveChangesAsync();
            }

            return Ok("Added Succefuly");
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order.status == 2)
                return BadRequest("Not allowed");
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.ID == id);
        }
    }
}
