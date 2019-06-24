/**
 *TODO: DONE
 **GET     : /categories                  // Get all categories
 **GET     : /categories/{id}             // Get all products of that categories
 *@POST    : /categories        {admin}   // Create a new Categories
 *?UPDATE  : /categories/{id}   {admin}   // Update Categories with Id
 *!DELETE  : /categories/{id}   {admin}   // Delete Categories with Id
 *TODO: DONE
// **GET     : /products                    // Get all Products of Apps
 **GET     : /products/{id}               // Get the products with id & depend on categoryId
 *@POST    : /products          {admin}   // Create new Product & depend on categoryId      
 *?UPDATE  : /products/{}       {admin}   // Update product with id & depend on categoryId
 *!DELETE  : /products/{}       {admin}   // Delete product with id & depend on categoryId

 *TODO: DONE
 **GET     : /toppings                    // Getall Toppings
 *@POST    : /toppings            {admin} // Create Toppings
 *?UPDATE  : /toppings/{id}       {admin} // Update Topping with id
 *!DELETE  : /toppings/{id}       {admin} // Delete Topping with id
 *
 * TODO: DONE
 **GET     : /users             {admin}    
 **GET     : /users/info        {authen}   
 *@POST    : /users                        
 *@POST    :/login                         
 *?UPDATE  : /users/info        {authen}   
 *!DELETE  : /users{id}         {admin}    
 * 
 *  
 
 **GET     : /orders              {admin} // Get all Orders sort by OrderDate
 **GET     : /cart                {user}  // Get orderDetails 
 **GET     : /orders/{id}         {user}  //     
 **GET     : /orders/history      {user}
 *@POST    : /orders              {admin}       
 *!DELETE  : /orders/{id}    {admin|user}
 **GET
 * 
 * 
 **GET     : /productDetail
 * 
 **GET     : /bestsellers          
 *


/**
 * TODO: QUESTION OF THE HAPI.JS
 * ? When i delete the customer account
 * ! How i remove the session (cookie) of that customer
 * * Position: src/service/CustomerService.js           deleteCustomer()
 */





















 /**
  * database access
    lytaitruong 
    Anhboydeptrai5

MongoAtlas
    lytaitruong060197@gmail.com
    Anhboydeptraivip5!

Network Whitelist
    IP Address: 0.0.0.0

mongodb+srv://lytaitruong:<Anhboydeptrai5>@leeatschool-qo1pj.mongodb.net/test?retryWrites=true&w=majority


heroku account
    lytaitruong060197@gmail.com
    Anhboydeptraithe5
  */




  const a = [
      {
          quantity: 3,
          unitPrice: 4
      },
      {
        quantity: 7,
        unitPrice: 2
    },
    {
        quantity: 6,
        unitPrice: 9,
    },
    {
        quantity: 14,
        unitPrice: 10
    }
  ];
  const b = a.reduce((total, orderDetails) =>{
        console.log()
        return total + orderDetails.quantity * orderDetails.unitPrice
  },0)
  console.log(b);