using API_Project.Models;
using API_Project.ViewModel;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Project
{
    public class UserProfile:Profile
    {
        public UserProfile()
        {
            CreateMap<Product, ProductVM>();
        }
    }
}
