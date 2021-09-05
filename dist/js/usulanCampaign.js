const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
});

function readKategoriEdit() {
  firebase.firestore().collection("Kategori").onSnapshot(function (snapshot) {
    snapshot.forEach(function (kategoriValue) {
      var kategori = kategoriValue.data();

      if (kategori.namaKat == kategoriTerpilih) {
        document.getElementById("kategoriEdit").innerHTML += `
  <option value="${kategoriTerpilih}" selected="selected">${kategoriTerpilih}</option>`
      } else {
        document.getElementById("kategoriEdit").innerHTML += `
  <option value="${kategori.namaKat}">${kategori.namaKat}</option>`
      }
    });
  })

}


function readUsulanCampaign() {
    firebase.firestore().collection("UsulanCampaign").orderBy("tanggal", "desc")
    .onSnapshot(function (snapshot) {
        document.getElementById("table").innerHTML = `<thead class="thead-dark">
          <tr>
                  
                  <th scope="col" width="50 px">#</th>
                  <th scope="col" width="150 px">Nama Pengusul</th>
                  <th scope="col" width="190 px">email</th>
                  <th scope="col" width="300 px">Nama Campaign</th>
                  <th scope="col" width="180 px">Tanggal</th>
                  <th scope="col">Action</th>
                  
 
        </tr>
      </thead>`;
        var i = 1;
        snapshot.forEach(function (usulanValue) {
            var usulan = usulanValue.data();
            document.getElementById("table").innerHTML += `
              <tbody>
              <tr>
                <th scope="row">${i++}</th>
                <td class="card-title namaPengusul">${usulan.namaPengusul}</td>
                <td class="email">${usulan.email}</td>
                <td class= "nomor">${usulan.namaCamp}</td>
                <td class="usulanCampaign" style=" display:none">${usulan.usulanCampaign}</td>
               <td class= "tanggal">${(usulan.tanggal).toDate()}</td>
               <td class="gambar" style="display:none"><p>${usulan.gambarCampaign}</p></td>
               <td class= "namaCampaign" style=" display:none">${usulan.namaCamp}</td>
               <td class="kategori" style=" display:none">${usulan.kategori}</td>
               <td class= "danaCampaign" style=" display:none">${usulan.danaCampaign}</td>
               <td>
               <button type="button" style="font-size: 14px;" id="edit-campaign-btn" data-heroId="${usulanValue.id}" class="btn btn-success edit-campaign-btn" data-toggle="modal" data-target="#editModal" data-backdrop="static" data-keyboard="false">Publish</button>
          </td>
                            
                
              </tr>
            </tbody>
  `
        });
    });
}


$(document).on('click', '.edit-campaign-btn', function edit() {
  readKategoriEdit();
  var campaignId = $(this).attr('data-heroId');
  console.log("you click " + campaignId);
  $('#campaignId').val(campaignId);

  var nama = $(this).closest('tr').find('.namaCampaign').text();
  $('#namaCampaignEdit').val(nama);

  var dana = $(this).closest('tr').find('.danaCampaign').text();
  $('#danaCampaignEdit').val(dana);

  var kategori = $(this).closest('tr').find('.kategori').text();
  $('#kategoriEdit').val(kategori);

  var deskripsi = $(this).closest('tr').find('.usulanCampaign').text();
  $('#deskripsiEdit').val(deskripsi);

  // var danaTerkumpul = $(this).closest('tr').find('.danaTerkumpul').text();
  // $('#danaTerkumpulEdit').val(danaTerkumpul);

  var gambar = $(this).closest('tr').find('.gambar').text();
  $('#gambarCampaignEdit').val(gambar);

  var isEnable = $(this).closest('tr').find('.isEnable').text();
  $('#isEnableEdit').val(isEnable);

  var imageEditt = document.querySelector('#imageEdit');
  imageEditt.src = gambar;

  kategoriTerpilih = kategori;


});



function editCampaign() {
  // if(statusValidateEdit) {
    var danaKeb = $("#danaCampaignEdit").val();
    var danaKebutuhan = parseInt(danaKeb);
    var danaTer = $("#danaTerkumpulEdit").val();
    var danaTerkumpul = parseInt(danaTer);
    const database = firebase.firestore();
    const collection = database.collection('Campaign');
    const idCamp = $('#campaignId').val();
    campaign = {
      namaCampaign: $("#namaCampaignEdit").val(),
      deskripsi: $("#deskripsiEdit").val(),
      danaCampaign: danaKebutuhan,
      danaTerkumpul: 0,
      kategori: $("#kategoriEdit").val(),
      isEnable : "true",
      gambarCampaign: $("#gambarCampaignEdit").val(),
      tanggal: firebase.firestore.FieldValue.serverTimestamp(),
    }
      
  // }else{
  //   return false;
  // }

  // campaign = {
  //   namaCampaign: "sdad",
  //   deskripsi: "dfsdjfshdf",
  //   danaCampaign: 100000,
  //   danaTerkumpul: 0,
  //   kategori: "sosial",
  //   isEnable : "true",
  //   gambarCampaign: "sdasdasd",
  //   tanggal: firebase.firestore.FieldValue.serverTimestamp(),
  // }

  addCampaign(campaign);

}


function addCampaign(campaign) {
  // validateAddForm();
  // errorMessage();
  const database = firebase.firestore();
  const collection = database.collection('Campaign');

    collection.add(campaign);
    alert("Campaign berhasil ditambahkan");



}
function uploadImageEdit() {
  const ref = firebase.storage().ref()
  const file = document.querySelector("#photoEdit").files[0]
  const name = new Date() + '-' + file.name

  const metadata = {
    contentType: file.type
  }

  imageEdit(ref, name, file, metadata);
}


function imageEdit(ref, name, file, metadata) {
  const task = ref.child(name).put(file, metadata)

  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(urlEdit => {

      // alert("Image Upload Successful")
      const imageEdit = document.querySelector('#imageEdit')
      imageEdit.src = urlEdit
      document.getElementById("gambarCampaignEdit").value = urlEdit

    })
}

let template = null;
$('.modal').on('show.bs.modal', function showModalClear(event) {
  template = $(this).html();
});

$('.modal').on('hidden.bs.modal', function hiddenModalClear(e) {
  $(this).html(template);
});


setTimeout(function(){
  $( "#table" ).load( "campaign.html #table" );
}, 2000);

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