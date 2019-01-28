function allParcels() {
    let parcel_url = "https://senditv2.herokuapp.com/api/v2/parcels";
    fetch(parcel_url, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : "Bearer " + localStorage.getItem('token') 
            }
        })
        .then(res => res.json())
        .then(response => {
            // console.log(response)
            let parcels = response.message
            displayTable(parcels)
        })
        .catch(error => {
            alert("OOPS try again")
            console.log(error)
        });    
}
function displayTable(parcels){
    parcels.forEach(item => {
            if (item.status != "delivered") {
              let tr = document.createElement("tr");
              tr.innerHTML = `
                    <td contenteditable="true">${item.parcel_id}</td>
                    <td contenteditable="true">${item.parcel_type}</td>
                    <td contenteditable="true">${item.drop_off}</td>
                    <td contenteditable="true">${item.Recepient_number}</td>
                    <td contenteditable="true">${item.Recepeint_name}</td>
                    <td contenteditable="true">${item.drop_off}</td>
                    <td contenteditable="true">${item.Weight}</td>
                    <td>${item.date_ordered}</td>
                    <td>ontrasit<span class="fa fa-truck"></span></td>
                    `;
              document.getElementById("data").appendChild(tr);
            }
            if(item.status === "delivered"){
                let tr = document.createElement("tr");
                tr.innerHTML = `
                    <td contenteditable="true">${item.parcel_id}</td>
                    <td contenteditable="true">${item.parcel_type}</td>
                    <td contenteditable="true">${item.drop_off}</td>
                    <td contenteditable="true">${item.Recepient_number}</td>
                    <td contenteditable="true">${item.Recepeint_name}</td>
                    <td contenteditable="true">${item.drop_off}</td>
                    <td contenteditable="true">${item.Weight}</td>
                    <td>${item.date_ordered}</td>
                    <td>delivered<span class="fa fa-check"></span></td>
                    `;
                document.getElementById("delivered").appendChild(tr);
            }
          });
}