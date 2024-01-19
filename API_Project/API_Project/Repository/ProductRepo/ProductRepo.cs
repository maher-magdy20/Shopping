using API_Project.Models;
using API_Project.ViewModel;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Web.Http;

namespace API_Project.Repository.ProductRepo
{
    public class ProductRepo : ControllerBase, IProductRepo
    {
        private readonly AlaslyFactoryContext _context;
        private readonly IMapper _mapper;
        private readonly DbSet<Product> _dbSet;
        public ProductRepo(AlaslyFactoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _dbSet = context.Products;
        }
        #region Get One Product
        public async Task<ActionResult<ProductVM>> GetProduct(int id)
        {
            try
            {
                var product = await _context.Products.FindAsync(id);


                if (product == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "No Product Found" });
                }

                ProductVM productVM = _mapper.Map<ProductVM>(product);

                productVM.Images = await _context.ProductImages
                    .Where(P => P.ProductID == product.ID)
                    .Select(p => p.ImagePath).ToListAsync();
                productVM.Category = _context.Categories.Find(product.CategoryID).Name;
                productVM.Type = _context.Types.Find(product.TypeID).Name;
                productVM.Season = _context.Seasons.Find(product.SeasonID).Name;


                return Ok(productVM);
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region Get 12 Products
        public async Task<ActionResult<IEnumerable<ProductVM>>> GetProducts(int start, int categoryId, Expression<Func<Product, bool>> filter = null)
        {
            try
            {
                IQueryable<Product> query = _dbSet;

                if (filter != null)
                {
                    query = query.Where(filter);
                }
                List<ProductVM> ProductsWithImage = new List<ProductVM>();
                List<Product> products = await _context.Products.Where(P => P.CategoryID == categoryId)
                    .Skip(start).Take(12).ToListAsync();

                if (products != null && products.Count > 0)
                {
                    foreach (var product in products)
                    {
                        ProductVM productVM = _mapper.Map<ProductVM>(product);

                        productVM.FirstImage = _context.ProductImages
                            .Where(P => P.ProductID == product.ID)
                            .Select(p => p.ImagePath).FirstOrDefault();
                        productVM.Category = _context.Categories.Find(product.CategoryID).Name;
                        productVM.Type = _context.Types.Find(product.TypeID).Name;
                        productVM.Season = _context.Seasons.Find(product.SeasonID).Name;

                        ProductsWithImage.Add(productVM);
                    }
                    return Ok(ProductsWithImage);
                }
                else
                    return NotFound(new Response { Status = "Error", Message = "No Products Found" });
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region Show in home products
        public async Task<ActionResult<IEnumerable<ProductVM>>> GetProductsInHome()
        {
            try
            {
                List<ProductVM> ProductsWithImage = new List<ProductVM>();
                List<Product> products = await _context.Products
                    .Where(P => P.ShowInHome == true).ToListAsync();
                //.Skip(start).Take(20).ToListAsync();

                if (products != null && products.Count > 0)
                {
                    foreach (var product in products)
                    {
                        ProductVM productVM = _mapper.Map<ProductVM>(product);

                        productVM.FirstImage = _context.ProductImages
                            .Where(P => P.ProductID == product.ID)
                            .Select(p => p.ImagePath).FirstOrDefault();
                        productVM.Category = _context.Categories.Find(product.CategoryID).Name;
                        productVM.Type = _context.Types.Find(product.TypeID).Name;
                        productVM.Season = _context.Seasons.Find(product.SeasonID).Name;

                        ProductsWithImage.Add(productVM);
                    }
                    return Ok(ProductsWithImage);
                }
                else
                    return NotFound(new Response { Status = "Error", Message = "No Products To Show" });
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        #endregion

        #region Search
        public async Task<ActionResult<IEnumerable<ProductVM>>> GetSearchResult(string searchKey, int start, Expression<Func<Product, bool>> filter = null)
        {

            try
            {
                IQueryable<Product> query = _dbSet;

                if (filter != null)
                {
                    query = query.Where(filter);
                }
                List<ProductVM> ProductsWithImage = new List<ProductVM>();
                List<Product> products = await query
                    .Where(P => P.Name.Contains(searchKey))
                    .Skip(start).Take(12).ToListAsync();

                if (products != null && products.Count > 0)
                {
                    foreach (var product in products)
                    {
                        ProductVM productVM = _mapper.Map<ProductVM>(product);

                        productVM.FirstImage = _context.ProductImages
                            .Where(P => P.ProductID == product.ID)
                            .Select(p => p.ImagePath).FirstOrDefault();
                        productVM.Category = _context.Categories.Find(product.CategoryID).Name;
                        productVM.Type = _context.Types.Find(product.TypeID).Name;
                        productVM.Season = _context.Seasons.Find(product.SeasonID).Name;

                        ProductsWithImage.Add(productVM);
                    }
                    return Ok(ProductsWithImage);
                }
                else
                    return NotFound(new Response { Status = "Error", Message = "No Products Found" });

            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion
        #region GetCount
        public ActionResult< int>  GetCount(int categoryId)
        {
            try
            {

                int count = _context.Products.Where(P => P.CategoryID == categoryId).Count();
                if (count > 0)
                    return Ok(count);
                else
                    return NotFound(new Response { Status = "Error", Message = "No Products Found" });


            }
            catch (Exception)
            {

                throw;
            }
}
        ////////////
        public  ActionResult<int> GetCount( string searchKey, Expression<Func<Product, bool>> filter = null)
        {
            try
            {
                int count = _context.Products
                .Where(P => P.Name.Contains(searchKey)).Count();
                if (count > 0)
                    return Ok(count);
                else
                    return NotFound(new Response { Status = "Error", Message = "No Products Found" });

            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region Get Smiliar
        public async Task<ActionResult<IEnumerable<ProductVM>>> GetSimilarProducts(int typeId, int categoryId, int productId)
        {
            try
            {
                List<ProductVM> ProductsWithImage = new List<ProductVM>();
                List<Product> products = await _context.Products.Where(P => P.ID != productId && P.TypeID == typeId)
                    .Take(4).ToListAsync();

                if (products != null)
                {

                    foreach (var product in products)
                    {
                        ProductVM productVM = _mapper.Map<ProductVM>(product);

                        productVM.FirstImage = _context.ProductImages
                            .Where(P => P.ProductID == product.ID)
                            .Select(p => p.ImagePath).FirstOrDefault();
                        productVM.Category = _context.Categories.Find(product.CategoryID).Name;
                        productVM.Type = _context.Types.Find(product.TypeID).Name;
                        productVM.Season = _context.Seasons.Find(product.SeasonID).Name;

                        ProductsWithImage.Add(productVM);
                    }
                    return ProductsWithImage;
                }
                else
                    return new NotFoundResult();
            }
            catch (Exception)
            {
                throw;
            }
        }

        #endregion
       
    }
}
