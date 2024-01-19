using API_Project.Models;
using API_Project.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace API_Project.Repository
{
   public interface IProductRepo
    {

        Task<ActionResult<IEnumerable<ProductVM>>> GetProducts(int start, int categoryId, Expression<Func<Product, bool>> filter = null);
        Task<ActionResult<IEnumerable<ProductVM>>> GetProductsInHome();
        Task<ActionResult<IEnumerable<ProductVM>>> GetSearchResult(string searchKey,int start, Expression<Func<Product, bool>> filter = null);
        Task<ActionResult<ProductVM>> GetProduct(int id);
        Task<ActionResult<IEnumerable<ProductVM>>> GetSimilarProducts(int typeId, int categoryId, int productId);

        public ActionResult<int> GetCount(int categoryId);
        public ActionResult<int> GetCount(string searchKey, Expression<Func<Product, bool>> filter = null);


    }
}
