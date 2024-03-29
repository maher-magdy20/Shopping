﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace API_Project.Models
{
    [Table("Product_In_Cart")]
    public partial class Product_In_Cart
    {
        [Key]
        public int ProductID { get; set; }
        [Key]
        public int CartID { get; set; }
        public int quantity { get; set; }

        [ForeignKey(nameof(CartID))]
        [InverseProperty("Product_In_Carts")]
        public virtual Cart Cart { get; set; }
        [ForeignKey(nameof(ProductID))]
        [InverseProperty("Product_In_Carts")]
        public virtual Product Product { get; set; }
    }
}