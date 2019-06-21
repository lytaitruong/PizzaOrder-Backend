/**
 **GET     : /products                         
 **GET     : /products/{id}
 *@POST    : /products          {admin}
 *?UPDATE  : /products/{}       {admin}
 *!DELETE  : /products/{}       {admin}
 *
 **GET     : /categories                       
 **GET     : /categories/{id}
 *@POST    : /categories        {admin}
 *?UPDATE  : /categories/{id}   {admin}
 *!DELETE  : /categories/{id}   {admin}
 * 
 **GET     : /users             {admin}        
 **GET     : /users/myProfile   {authenticate}
 **GET     : /users/historyOrder{authenticate}     
 *@POST    : /users                      
 *@POST    :/login          
 *@POST    :/resetPassword      {authenticate}
 *?UPDATE  : /users{id}         {authenticate}
 *!DELETE  : /users{id}         {admin}
 * 
 **GET     : /orders
 **GET     : /orders/            
 *@POST    : /orders            
 *?UPDATE  : /orders/{id}                
 *!DELETE  : /orders/{id}
 *  
 **GET
 * 
 * 
 **GET     : /productDetail
 * 
 **GET     : /bestsellers          
 *
 * 
 */