function makeOrder() {
        // getting the form values
        let type = document.getElementById("type").value;
        let dropOff = document.getElementById("droping_place").value;
        let pickUp = document.getElementById("pick_up_place").value;
        let recepientName = document.getElementById("recepientName").value;
        let recepientNumber = document.getElementById("tel_number").value;
        let weight = document.getElementById("weight").value;
        let parcel_url = "https://senditv2.herokuapp.com/api/v2/parcels";
        let parcel_data = {
            parcel_type : type,
            drop_off_location : dropOff,
            pick_up_location : pickUp,
            status : "picked",
            recepient_name : recepientName,
            recepient_number : recepientNumber,
            weight : weight
        }
        fetch(parcel_url, {
            method: 'POST',
            body: JSON.stringify(parcel_data),
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : "Bearer " + localStorage.getItem('token') 
            }
        })
        .then(res => res.json())
        .then(response => {
            if(response.status === "added"){
                alert("successfully added")
                location.reload();
            } else {
                alert(response.message)
            }
        })
        .catch(error => alert("OOPS try again"));
}
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
        });    
}
function displayTable(parcels){
    parcels.forEach(item => {
            if (item.status != "delivered") {
              let tr = document.createElement("tr");
              tr.innerHTML = `
                    <td contenteditable="true">${item.parcel_type}</td>
                    <td contenteditable="true">${item.drop_off}</td>
                    <td contenteditable="true">${item.Recepient_number}</td>
                    <td contenteditable="true">${item.Recepeint_name}</td>
                    <td contenteditable="true" id="drop_off">${item.drop_off}</td>
                    <td contenteditable="true">${item.Weight}</td>
                    <td><button onclick="Changed('${item.parcel_id}')" class="confirm" value="Submit">change</button></td>
                    <td><button onclick="Cancelled()" class="cancel" value="Submit">cancel</button></td>
                    `;
              document.getElementById("data").appendChild(tr);
            }
          });
}

function Changed(parcel_id) {
    let dropOff = document.getElementById ( "drop_off" ).innerText
    let dest_url = "https://senditv2.herokuapp.com/api/v2/parcels/" + parcel_id +"/destination";
    console.log(dest_url)
    let destination = {
        dest : dropOff
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
            if(response.status === "success"){
                alert("destination changed to " + dropOff +". Note only destination can be changed")
            } else {
                alert(response.message)
            }
        })
        .catch(error => {
            alert("OOPS try again")
        });
}