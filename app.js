function orders(event) {
    event.preventDefault();
  
    var table = document.getElementById('table').value;
    var deals = document.getElementById('deals').value;
    var price = document.getElementById('price').value;
  
    var order = {
      Table: table,
      Deal: deals,
      Price: price,
    };
  
    axios
      .post('https://crudcrud.com/api/4d6324ad8d33482e99e9804163bab3b4/Orders', order)
      .then((res) => {
        console.log('Your Order Details Stored in cloud:', res.data);
        showOrderDetails(res.data);
      })
      .catch((err) => {
        console.error('Something went wrong while storing order details in the cloud', err);
      });
  }
  window.addEventListener("DOMContentLoaded",()=>{
    axios.get('https://crudcrud.com/api/4d6324ad8d33482e99e9804163bab3b4/Orders')
    .then((res)=>{
        console.log("get succsess")

        for (let i=0 ; i< res.data.length; i++){
            showOrderDetails(res.data[i])
        }
    })
    .catch((err)=>{
        console.log("get rejected")
    })
  })
  
  function showOrderDetails(order) {
    var orderDetailsContainer = document.getElementById('orderdetailscontainer');
  
    var orderDetailsDiv = document.createElement('div');
    orderDetailsDiv.innerHTML = `${order.Table} - ${order.Deal} - ₹ ${order.Price}`;
  
    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function () {
      deleteOrderDetails(order._id); // Assuming you have the correct order ID here
      orderDetailsDiv.remove();
    });
  
    orderDetailsDiv.appendChild(deleteBtn);
    orderDetailsContainer.appendChild(orderDetailsDiv);
  }
  
  function deleteOrderDetails(orderId) {
    axios
      .delete('https://crudcrud.com/api/4d6324ad8d33482e99e9804163bab3b4/Orders/' + orderId)
      .then(function (response) {
        console.log('Order detail deleted successfully:', response.data);
      })
      .catch(function (error) {
        console.error('Error deleting order details:', error);
      });
  }