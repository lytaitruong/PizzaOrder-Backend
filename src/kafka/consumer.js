const Kafka                  = require("node-rdkafka");
const OrderService          = require('../service/Order.Service');
require('dotenv').config();

var kafkaConf              = {
  "group.id"               : "cloudkarafka-example",
  "metadata.broker.list"   : process.env.CLOUDKARAFKA_BROKERS.split(","), 
  "socket.keepalive.enable": true,
  "security.protocol"      : "SASL_SSL",
  "sasl.mechanisms"        : "SCRAM-SHA-256",  
  "sasl.username"          : process.env.CLOUDKARAFKA_USERNAME,
  "sasl.password"          : process.env.CLOUDKARAFKA_PASSWORD,
  "enable.auto.commit"     : true,
  "debug"                  : "generic,broker,security"
};

const prefix         = process.env.CLOUDKARAFKA_TOPIC_PREFIX;
const topics         = [`${prefix}orderpizza`];
const consumer       = new Kafka.KafkaConsumer(kafkaConf,{
  "auto.offset.reset": "latest"
});

consumer.connect();

consumer.on("error", function (err) {
  console.error(err);
});

consumer.on("ready", function (arg) {
  console.log('Consumer Start')
  console.log(`Consumer ${arg.name} ready`);
  consumer.subscribe(topics);
  consumer.consume();
});

consumer.on("data", async function (data) {
    const stringData = data.value.toString();    
    const objData    = JSON.parse(stringData);

    const updateOrder = await OrderService.updateOrder(objData._id, objData.status)
    console.log(updateOrder);
    return updateOrder;
});

consumer.on("disconnected", function (arg) {
  console.log("consumer disconnected");
  process.exit();
});

consumer.on('event.error', function (err) {
  console.error(err);
  process.exit(1);
});
