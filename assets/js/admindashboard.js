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
            let parcels = response.message
            displayTable(parcels)
        })
        .catch(error => {
            alert("OOPS try again")
            console.log(error)
        });    
}
function displayTable(parcels){
    console.log(parcels)
    parcels.forEach(item => {
            if (item.status != "delivered") {
              let tr = document.createElement("tr");
              tr.innerHTML = `
                    <td contenteditable="true">${item.parcel_type}</td>
                    <td contenteditable="true">${item.drop_off}</td>
                    <td contenteditable="true">${item.Recepient_number}</td>
                    <td contenteditable="true">${item.Recepeint_name}</td>
                    <td contenteditable="true" id="location">${item.drop_off}</td>
                    <td contenteditable="true">${item.Weight}</td>
                    <td id="status" contenteditable="true">${item.status}<span class="fa fa-truck"></span></td>
                    <td><button onclick="updateStatus('${item.parcel_id}')" class="confirm" value="Submit">change status</button></td>
                    <td><button onclick="updateLocation('${item.parcel_id}')" class="confirm" value="Submit">change Location</button></td>
                    `;
              document.getElementById("data").appendChild(tr);
            }
            if(item.status === "delivered"){
                let tr = document.createElement("tr");
                tr.innerHTML = `
                    <td contenteditable="true">${item.parcel_id}</td>
                    <td contenteditable="true">${item.parcel_type}</td>
                    <td contenteditableallParcels()="true">${item.drop_off}</td>
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
function updateStatus(parcel_id) {
    let status = document.getElementById ( "status" ).innerText
    let dest_url = "https://senditv2.herokuapp.com/api/v2/parcels/" + parcel_id +"/status";
    console.log(dest_url)
    let destination = {
        status : status
    }
    fetch(dest_url, {
            method: 'PUT',
            body: JSON.stringify(destination),
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : "Bearer " + localStorage.getItem('token') 
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            if(response.status === "success"){
                alert("status updated to " + status)
                console.log(response)
            } else {
                alert(response.message)
            }
        })
        .catch(error => {
            alert("OOPS try again")
        });
}

function updateLocation(parcel_id) {
    let location = document.getElementById ( "location" ).innerText
    let loc_url = "https://senditv2.herokuapp.com/api/v2/parcels/" + parcel_id +"/presentLocation";
    console.log(loc_url)
    let destination = {
        location : location
    }
    fetch(loc_url, {
            method: 'PUT',
            body: JSON.stringify(destination),
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : "Bearer " + localStorage.getItem('token') 
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            if(response.status === "success"){
                alert("status updated to " + status)
                console.log(response)
            } else {
                alert(response.message)
            }
        })
        .catch(error => {
            alert("OOPS try again")
        });
}