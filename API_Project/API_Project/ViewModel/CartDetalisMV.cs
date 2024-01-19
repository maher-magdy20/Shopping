using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Project.ViewModel
{
    public class CartDetalisMV
    {
        public List <ProductCartMV> ProductsVCart {get;set;}
        public int TotalCartPrice { get; set; }

       /* internal void add(ProductCartMV productCartMVV)
        {
            throw new NotImplementedException();
        }
       */
    }
}
