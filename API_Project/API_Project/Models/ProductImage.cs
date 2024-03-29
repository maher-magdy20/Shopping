﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace API_Project.Models
{
    public partial class ProductImage
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string ImagePath { get; set; }
        public int ProductID { get; set; }

        [ForeignKey(nameof(ProductID))]
        [InverseProperty("ProductImages")]
        public virtual Product Product { get; set; }
    }
}