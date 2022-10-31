/* eslint-disable @typescript-eslint/require-await */

async function main(event) {
  return {
    body: JSON.stringify([
      {client_id: 14, event_id: 57, order_id:95225},
	  {client_id: 15, event_id: 58, order_id:95226},
	  {client_id: 16, event_id: 59, order_id:95227},
	  {client_id: 17, event_id: 60, order_id:95228},
	  {client_id: 18, event_id: 61, order_id:95229},
	  {client_id: 19, event_id: 62, order_id:95230},
	  {client_id: 20, event_id: 63, order_id:95231},
	  {client_id: 21, event_id: 64, order_id:95232},
	  {client_id: 22, event_id: 65, order_id:95233},
	  {client_id: 23, event_id: 66, order_id:95234},
	  {client_id: 24, event_id: 67, order_id:95235}
	  
      
    ]),
    statusCode: 200,
  };
}

module.exports = {main};

