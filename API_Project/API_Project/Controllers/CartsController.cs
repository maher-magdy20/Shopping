using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using API_Project.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization;
using API_Project.ViewModel;
using System.Security.Claims;

namespace API_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartsController : ControllerBase
    {
        private AlaslyFactoryContext _context;
        private IHttpContextAccessor _httpContextAccessor;
        

        public CartsController(AlaslyFactoryContext context,IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        // GET: api/Cart
        [HttpGet]
        [Route("GETCart")]
        public ActionResult<CartDetalisMV> GetCart()
        {
            try
            {

                string UserName = User.FindFirstValue(ClaimTypes.Name);
                var user_id = _context.AspNetUsers.Where(U => U.UserName == UserName).Select(U => U.Id).FirstOrDefault();
                Cart Cart1 = _context.Carts.FirstOrDefault(C => C.UserID == user_id);
                List<string> img = new List<string> { "img1", "img2" };
                if (Cart1==null)
                {
                    return BadRequest("cart is null");


                }
                int CartIDD = Cart1.ID;
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
                return Ok(cartview);


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // PUT: api/Carts/5
        // To protect from overposting attacks, see
        //////////////////******************************UPDATE function**************************************************
        [HttpPut]
        [Route("UpdateCart")]
        public IActionResult PutCart([FromBody] List<ProductIds> UpdatingProduct)
        {
            try
            {
                string UserName = User.FindFirstValue(ClaimTypes.Name);
                var user_id = _context.AspNetUsers.Where(U => U.UserName == UserName).Select(U => U.Id).FirstOrDefault();
                Cart Cart1 = _context.Carts.Where(C => C.UserID == user_id).FirstOrDefault();
                int CartIDD = Cart1.ID;
                foreach (var item in UpdatingProduct)
                {
                    var ProductOfCart = _context.Product_In_Carts.Where(p => p.ProductID == item.ProductID && p.CartID == CartIDD).FirstOrDefault();
                    if (item.Quntity > 0)
                    {
                        ProductOfCart.quantity = item.Quntity;
                        _context.SaveChanges();
                    }
                    else
                        return BadRequest(new Response { Status = "Erro", Message = "quntity no valid successfully!" });
                }



                return Ok(new Response { Status = "Success", Message = "product added successfully!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }
        //********************************************ADD TO CART FUNCTION**********************************************************
        // POST: api/Carts


        [HttpPost]
        [Route("AddProductToCart")]
        
        public async Task<ActionResult> PostToCart(ProductIds productIdsvm)
        {
            try
            {
                string UserName = User.FindFirstValue(ClaimTypes.Name);
                var user_id = _context.AspNetUsers.Where(U => U.UserName == UserName).Select(U => U.Id).FirstOrDefault();
                Cart Cart1 = _context.Carts.FirstOrDefault(C => C.UserID == user_id);
                Cart NewCart = new Cart();



                if (Cart1 == null)
                {
                    NewCart.UserID = user_id;
                    _context.Carts.Add(NewCart);
                    await _context.SaveChangesAsync();

                }
                Product ProductAdded = _context.Products.FirstOrDefault(p => p.ID == productIdsvm.ProductID);
                if (ProductAdded == null)
                {
                    return BadRequest(new Response { Status = "Error", Message = "product Null!" });
                }

                Product_In_Cart Pro = new Product_In_Cart()
                {
                    ProductID = ProductAdded.ID,
                    CartID = Cart1.ID,
                    quantity = productIdsvm.Quntity,
                  

                      };
                _context.Product_In_Carts.Add(Pro);


                await _context.SaveChangesAsync();




                    return Ok(new Response { Status = "Success", Message = "product added successfully!" });
                }
            
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        //}
        ////****************************************DELETE FROM CART FUNCTION*************************************************************************

        // DELETE: api/Carts/5
        [HttpDelete]
        [Route("DeleteProduct")]
        public async Task<IActionResult> DeleteFromCart([FromBody]int product_id)
        {

            try
            {
                string UserName = User.FindFirstValue(ClaimTypes.Name);
                var user_id = _context.AspNetUsers.Where(U => U.UserName == UserName).Select(U => U.Id).FirstOrDefault();
                Cart Cart1 = _context.Carts.FirstOrDefault(C => C.UserID == user_id);
                int CartIDD = Cart1.ID;
                var ProductOfCart = _context.Product_In_Carts.Where(p => p.ProductID == product_id && p.CartID == CartIDD).FirstOrDefault();
                _context.Product_In_Carts.Remove(ProductOfCart);

                await _context.SaveChangesAsync();

                return Ok(new Response { Status = "Success", Message = "product removed from cart successfully!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }
        ////***********************************************************Delete CART***************************************************************************
        [HttpDelete]
        [Route("DeleteCart")]
            public IActionResult DeleteCart()
            {

                try
                {
                string UserName = User.FindFirstValue(ClaimTypes.Name);
                var user_id = _context.AspNetUsers.Where(U => U.UserName == UserName).Select(U => U.Id).FirstOrDefault();
                Cart Cart1 = _context.Carts.FirstOrDefault(C => C.UserID == user_id);
                    int CartIDD = Cart1.ID;
                    var ProductsOfCart = _context.Product_In_Carts.Where(d => d.CartID == CartIDD).ToList();
                    foreach (var ProductItem in ProductsOfCart)
                    {
                        _context.Product_In_Carts.Remove(ProductItem);


                    }
                    _context.SaveChanges();


                    return Ok(new Response { Status = "Success", Message = "cart Deleted successfully!" });
                }

                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }

            }

        }


}
