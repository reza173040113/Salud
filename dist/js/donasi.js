
const database = firebase.firestore();
const userCollection = database.collection('Donasi');
var statusAdd = false;
var campaign;


// Clear modal
let template = null;
$('.modal').on('show.bs.modal', function (event) {
    template = $(this).html();
});

$('.modal').on('hidden.bs.modal', function (e) {
    $(this).html(template);
});


function detailShow(id) {
    userCollection.doc(id).get()
        .then(donasis => {
            donasi = donasis.data();
            var date = new Date(donasi.tanggal * 1000);
           
            if (donasis.exists)

                document.getElementById("detailSection").innerHTML += `
     
        <div class="card-body">
        <table class="table">
        <tr>
        <td>Nama Donatur</td>
        <td>${donasi.namaDonatur}</td>
        </tr>
        <tr> 
        <td>Email</td>
        <td>${donasi.email}</td>
        </tr>
        <tr>
        <td>Nomor Telp</td>
        <td>${donasi.nomor}</td>
        </tr>
        <tr>
        <td>Nama Campaign</td>
        <td>${donasi.namaCampaign}</td>
        </tr>
        <tr>
        <td>Jumlah Donasi</td>
        <td>${Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" }).format(donasi.totalAmount)}</td>
        </tr>
        <tr>
        <td>Status transaksi</td>
        <td>${donasi.status}</td>
        </tr>
        <tr>
        <td>Tanggal transaksi</td>
        <td>${(donasi.tanggal).toDate()}</td>
        </tr>
        </table>
      </div>
        
    `
            else
                console.log('Campaign does not exist !');
        })
        .catch(error => {
            console.error(error);
        });
}

function readKategori() {
    firebase.firestore().collection("Kategori").onSnapshot(function (snapshot) {
        snapshot.forEach(function (kategoriValue) {
            var kategori = kategoriValue.data();

            document.getElementById("kategoriAdd").innerHTML += `
      <option value="${kategori.namaKat}">${kategori.namaKat}</option>
`
            document.getElementById("kategoriEdit").innerHTML += `
<option value="${kategori.namaKat}">${kategori.namaKat}</option>
`


        });
    })
}

function readDonasi() {
    firebase.firestore().collection("Donasi").orderBy("tanggal", "desc").onSnapshot(function (snapshot) {
        document.getElementById("table").innerHTML = `<thead class="thead-dark">
          <tr>
                  
                  <th scope="col" width="50 px">#</th>
                  <th scope="col">Nama Donatur</th>
                  <th scope="col" width="150 px">Email</th>
                  <th scope="col" width="200 px">Nama Campaign</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                  
 
        </tr>
      </thead>`;
        var i = 1;
        snapshot.forEach(function (donasiValue) {
            var donasi = donasiValue.data();
            document.getElementById("table").innerHTML += `
              <tbody>
              <tr>
                <th scope="row">${i++}</th>
                <td class="card-title nama">${donasi.namaDonatur}</td>
                <td class="email">${donasi.email}</td>
                <td class= "nomor">${donasi.namaCampaign}</td>
                <td class="danaKebutuhan">${Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" }).format(donasi.totalAmount)}</td>
               <td class= "nomor">${donasi.status}</td>
               <td>
                 <button type="button" id="detail-btn"  class="btn btn-success" onclick="detailShow('${donasiValue.id}')" data-toggle="modal" data-target="#detailModal">Details</button>
                
            </td>
                            
                
              </tr>
            </tbody>
  `
        });
    });
}

// function readDonasi() {
//     firebase.firestore().collection("Donasi").onSnapshot(function (snapshot) {
//         document.getElementById("table").innerHTML = `<thead class="thead-dark">
//           <tr>

//                   <th scope="col" width="50 px">#</th>
//                   <th scope="col">Nama Donatur</th>
//                   <th scope="col" width="150 px">email</th>
//                   <th scope="col">nomor</th>
//                   <th scope="col">jumlah</th>
//                   <th scope="col">status</th>
//                   <th scope="col">Action</th>


//         </tr>
//       </thead>`;
//         var i = 1;
//         snapshot.forEach(function (donasiValue) {
//             var donasi = donasiValue.data();
//             document.getElementById("table").innerHTML += `
//               <tbody>
//               <tr>
//                 <th scope="row">${i++}</th>
//                 <td class="card-title nama">${donasi.namaDonatur}</td>
//                 <td class="email">${donasi.email}</td>
//                 <td class= "nomor">${donasi.nomor}</td>
//                 <td class="danaKebutuhan">${Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" }).format(donasi.totalAmount)}</td>
//                <td class= "nomor">${donasi.status}</td>
//                <td>
//                  <button type="button" id="detail-btn"  class="btn btn-success">Details</button>

//             </td>


//               </tr>
//             </tbody>
//   `
//         });
//     });
// }

// function readDonasi() {
//   firebase.firestore().collection("Campaign").onSnapshot(function (snapshot) {
//     document.getElementById("table").innerHTML = `<thead class="thead-dark">
//         <tr>
//         <th scope="col" width="50 px">#</th>
//         <th scope="col">Nama Donatur</th>
//         <th scope="col" width="120 px">email</th>
//         <th scope="col">nomor</th>
//         <th scope="col">jumlah</th>
//         <th scope="col">status</th>
//         <th scope="col">Action</th>
//       </tr>
//     </thead>`;
//     var i = 1;
//     snapshot.forEach(function (donasiValue) {
//       var donasi = donasiValue.data();
//       document.getElementById("table").innerHTML += `
//             <tbody>
//             <tr>
//               <th scope="row">${i++}</th>
//               <td class="card-title nama">${donasi.namaDonatur}</td>
//               <td class="email">${donasi.email}</td>
//               <td class= "nomor">${donasi.nomor}</td>
//               <td class="danaKebutuhan">${Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" }).format(donasi.totalAmount)}</td>
//               <td class= "nomor">${donasi.status}</td>
//               <td>
//                    <button type="button" id="detail-btn"  class="btn btn-success" onclick="detailShow('${campaignValue.id}')" data-toggle="modal" data-target="#detailModal">Details</button>
//                   <button type="button" id="edit-campaign-btn" data-heroId="${campaignValue.id}" class="btn btn-success edit-campaign-btn" data-toggle="modal" data-target="#editModal">Edit</button>
//                   <button type="submit" class="btn btn-success" onclick="deleteCamp('${campaignValue.id}')">Hapus</button>
//               </td>
//             </tr>
//           </tbody>
// `
//     });
//   });
// }

function deleteCamp(id) {
    firebase.firestore().collection("Campaign").doc(id).delete().then(() => {
        console.log("data dihapus");
    });
}

$(document).on('click', '.edit-campaign-btn', function () {
    var campaignId = $(this).attr('data-heroId');
    console.log("you click " + campaignId);
    $('#campaignId').val(campaignId);


    var nama = $(this).closest('tr').find('.nama').text();
    $('#namaCampaignEdit').val(nama);

    var dana = $(this).closest('tr').find('.danaCampaign').text();
    $('#danaCampaignEdit').val(dana);

    var kategori = $(this).closest('tr').find('.kategori').text();
    $('#kategoriEdit').val(kategori);

    var deskripsi = $(this).closest('tr').find('.deskripsi').text();
    $('#deskripsiEdit').val(deskripsi);

    var danaTerkumpul = $(this).closest('tr').find('.danaTerkumpul').text();
    $('#danaTerkumpulEdit').val(danaTerkumpul);

    var gambar = $(this).closest('tr').find('.gambar').text();
    $('#gambarCampaignEdit').val(gambar);


});


$('#edit-campaign-button').click(function () {
    var danaKeb = $("#danaCampaignEdit").val();
    var danaKebutuhan = parseInt(danaKeb);
    var danaTer = $("#danaTerkumpulEdit").val();
    var danaTerkumpul = parseInt(danaTer);
    const database = firebase.firestore();
    const userCollection = database.collection('Campaign');
    const idCamp = $('#campaignId').val();
    userCollection.doc(idCamp).update({
        namaCampaign: $("#namaCampaignEdit").val(),
        deskripsi: $("#deskripsiEdit").val(),
        danaCampaign: danaKebutuhan,
        danaTerkumpul: danaTerkumpul,
        kategori: $("#kategoriEdit").val(),
        gambarCampaign: $("#gambarCampaignEdit").val(),
        tanggal: firebase.firestore.FieldValue.serverTimestamp(),
    })
        .then(() => { console.log('Data Successfully'); })
        .catch(error => { console.error(error) });

});


function uploadImageAdd() {
    const ref = firebase.storage().ref()

    const file = document.querySelector("#photoAdd").files[0]

    const name = new Date() + '-' + file.name

    const metadata = {
        contentType: file.type
    }

    const task = ref.child(name).put(file, metadata)

    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {

            alert("Image Upload Successful")
            const image = document.querySelector('#imageAdd')
            image.src = url
            document.getElementById("gambarCampaignAdd").value = url

        })
}


function uploadImageEdit() {
    const ref = firebase.storage().ref()

    const file = document.querySelector("#photoEdit").files[0]

    const name = new Date() + '-' + file.name

    const metadata = {
        contentType: file.type
    }

    const task = ref.child(name).put(file, metadata)

    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(urlEdit => {

            alert("Image Upload Successful")
            const imageEdit = document.querySelector('#imageEdit')
            imageEdit.src = urlEdit
            document.getElementById("gambarCampaignEdit").value = urlEdit

        })
}


function searching() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}