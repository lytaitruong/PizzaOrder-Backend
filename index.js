/**
 *TODO: DONE
 **GET     : /categories                       
 **GET     : /categories/{id}
 *@POST    : /categories        {admin}
 *?UPDATE  : /categories/{id}   {admin}
 *!DELETE  : /categories/{id}   {admin}

 *TODO: DONE
 **GET     : /products                         
 **GET     : /products/{id}
 *@POST    : /products          {admin}
 *?UPDATE  : /products/{}       {admin}
 *!DELETE  : /products/{}       {admin}

 *TODO: DONE
 **GET     : /toppings                         
 **GET     : /toppings/{id}
 *@POST    : /toppings            {admin}
 *?UPDATE  : /toppings/{id}       {admin}
 *!DELETE  : /toppings/{id}       {admin}
 
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
 **GET     : /orders/{id}            
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



const a = [
    {
        quantity: 5,
        unitPrice: 20,
    },
    {
        quantity: 5,
        unitPrice: 20,
    },
    {
        quantity: 5,
        unitPrice: 20,
    },
    {
        quantity: 5,
        unitPrice: 20,
    },
    {
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },{
        quantity: 5,
        unitPrice: 20,
    },
]
const init = async () =>{
    const b =  a.reduce((total,price) =>{
        return  total + (price.quantity * price.unitPrice)
    },0)
    console.log(b);
}
init();




























































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