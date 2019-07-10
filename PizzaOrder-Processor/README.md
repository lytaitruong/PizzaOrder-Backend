const sendMessage = function (req, reply) {
  
  const status = req.payload.status;
  const _id    = req.params.id;
  
  try {
    console.log('procedure message: order id ' + _id + 'order status ' + status);
    producer.produce(topic, -1, new Buffer.from(JSON.stringify({
      _id: _id,
      status: status
    })
    ), 2);
  
  } catch (err) {
    console.error(err);
  
  }
  return "Message sent successfully!"
}
const deliverPizza = function (orderId, status) {    
    try {
      console.log('3rd Partner received the order, make pizza and deliver it to user after 3s');
      console.log('Process and Delivered Pizza order id: ' + orderId );
      producer.produce(topic, -1, new Buffer.from(JSON.stringify({
        _id: orderId,
        status: status
      })
      ), 2);
    
    } catch (err) {
      console.error(err);
    
    }
    return "Message sent successfully!"
  }

module.exports = {
    deliverPizza,
  sendMessage,
  validatePayload
}



    // const stringData       = m.value.toString();    
    // const objData          = JSON.parse(stringData);      
    // console.log('Receive order: '+ objData._id);

    // setTimeout(function () {      
    // //}, 30000);


    // //producer.deliverPizza(objData._id, "delivered")

    server.route({
        method:'GET',
        path: '/favicon.ico',
        handler : (res, h)=>{
            return 'favicon.ico'
        }
    });

    server.route({
        method: 'POST',
        path: '/orders/{id}',
        handler:  producer.sendMessage,            
        
        options: {           
            validate : producer.validatePayload
        }
    });