document.getElementById('error').style.display = 'none';

const search = () => {


    const searchField = document.getElementById('search-field');
    const searchText = (searchField.value);
    if (searchText == '') {
        document.getElementById('not-found').style.display = 'none';
        //show message
        document.getElementById('blank').style.display = 'block';
    }
    // clear data 
    searchField.value = "";
    // document.getElementById('error').style.display = 'none';
    //load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayphones(data.data))
        .catch(error => displayError(error));
}
const displayError = error => {
    document.getElementById(error).style.display = 'block';
}

const displayphones = phones => {
    // initailly display none 
    document.getElementById('not-found').style.display = 'none';
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    // searchResult.innerHTML = '';
    searchResult.textContent = '';
    console.log(phones.length);
    if (phones.length == 0) {
        //show no result found 

        const notFound = document.getElementById('not-found');
        notFound.style.display = 'block';
    }

    phones.forEach(phone => {

        // console.log(phone);

        const div = document.createElement('div');
        div.classList.add('col');

        //only 20 search item shows 

        div.innerHTML = `
        <div  class="card p-3">
            
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h6 class="card-text">${phone.brand}</h6>
            </div>
            <button class="btn-outline-info" onclick="loadphoneDetail('${phone.slug}')">Details</button>
        </div>
            `;
        searchResult.appendChild(div);

    })
}

// async await concept
const loadphoneDetail = slug => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    console.log(url);
    try {
        fetch(url)
            .then(res => res.json())
            .then(data => displayphoneDetail(data.data));
    }
    catch (error) {
        console.log(error);
    }


}
const displayphoneDetail = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
    <div class="row p-3 pb-5 ">
    <div class=" col-12 col-md-7 g-3 mx-auto"><img src="${phone.image}" class="card-img-top" alt="..."></div>
    
    <div class="col-12 card-body col-md-5 ">
        <h4 class="card-title">${phone.name}</h4>
        <p class="card-text text-primary">${phone.releaseDate}</p>
        <p class="card-text "><span class='fw-bold text-primary'>Special Sensors:<span><br> ${phone.mainFeatures.sensors}</p>
        
        <p class="card-text fw-bold">${phone.mainFeatures.chipSet}[chip-set]</p>
        <ul class:"fw-bold"><span class="text-info">Others Info</span>
            <li>WLAN:${phone.others.WLAN}</li>
            <li>Bluetooth:${phone.others.Bluetooth}</li>
            <li>GPS:${phone.others.GPS}</li>
            <li>NFC:${phone.others.NFC}</li>
            <li>Radio:${phone.others.Radio}</li>
            <li>USB:${phone.others.USB}</li>
            
            
        </ul>
        
        
    </div></div>
    `;

    phoneDetails.appendChild(div);
}
// const youtube =()=>{
//     fetch()
// }