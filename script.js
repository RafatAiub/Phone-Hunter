document.getElementById('error').style.display = 'none';//for error message

const search = () => {

    const searchField = document.getElementById('search-field');
    const searchText = (searchField.value);
    if (searchText == '') {
        //show message
        // document.getElementById('blank').style.display = 'block';
        document.getElementById('not-found').style.display = 'block';
    }
    // clear data 
    searchField.value = "";
    document.getElementById('error').style.display = 'none';
    //load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayphones(data.data))
        .catch(error => displayError(error));
    // remove previous sesarch data 
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
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
            <div class="d-flex">
            <div class="card-body">
                <h3 class="card-title fw-bolder">${phone.phone_name}</h3>
                <h4 class="card-text">${phone.brand}</h4>
            </div>
            <a  href="#header" class="align-right mt-5 me-2 "><button   class="btn-outline-info fw-bolder p-2" onclick="loadphoneDetail('${phone.slug}')">Details</button></a>
            </div>
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
    let releaseMessage = '';
    if (phone.releaseDate == '') {
        releaseMessage = 'Not released Yet!!!'
    } else {
        releaseMessage = '';
    }
    div.innerHTML = `
    <div class="row p-3 pb-5 d-flex">
    <div class=" col-12 col-md-7 g-3 mx-auto"><img src="${phone.image}" class="card-img-top" alt="..."></div>
    
    <div class="col-12 card-body col-md-5 align-items-center mt-5 pt-5 ">
        <h2 class="card-title fw-bolder">${phone.name}</h2>
        
        <p class="card-text " ><span class='fw-bold text-primary'>Special Sensors:</span><br></p>
        <h5> ${phone.mainFeatures.sensors}</h5><br>
        
        <p class="card-text fw-bold">${phone.mainFeatures.chipSet}[<span class="text-primary">chip-set</span>]</p><br>
        <div class="text-gray fw-bold">Others Info
        <ul >
            <li>WLAN:${phone.others.WLAN}</li>
            <li>Bluetooth:${phone.others.Bluetooth}</li>
            <li>GPS:${phone.others.GPS}</li>
            <li>NFC:${phone.others.NFC}</li>
            <li>Radio:${phone.others.Radio}</li>
            <li>USB:${phone.others.USB}</li>    
        </ul>
        </div>
        <p class="card-text text-primary fw-bolder">${phone.releaseDate}</p>
        <h5 id="release class="text-info">${releaseMessage}</h5>
    </div></div>
    `;


    phoneDetails.appendChild(div);
}
