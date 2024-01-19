using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_Project.ViewModel
{
    public class OrderVM
    {
        public OrderVM()
        {

        }
        [Key]
        public int ID { get; set; }
        [Required]
        [StringLength(450)]
        public string UserID { get; set; }
        public int CartID { get; set; }
        public double TotalPrice { get; set; }
        public int status { get; set; }
        [Required]
        public string Address { get; set; }
        public bool PaymentMethod { get; set; }
    }
}
