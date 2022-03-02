document.getElementById('error').style.display = 'none';
const search = () => {


    const searchField = document.getElementById('search-field');
    const searchText = (searchField.value);
    if (searchText == '') {
        //show message
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
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    // searchResult.innerHTML = '';
    searchResult.textContent = '';
    // if (phones.length == 0) {
    //     //show no result found 
    // }
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div  class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h6 class="card-text">${phone.brand}</h6>
            </div>
            <button onclick="loadphoneDetail('${phone.slug}')">Details</button>
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
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h4 class="card-title">${phone.name}</h4>
        <p class="card-text text-primary">${phone.releaseDate}</p>
        <p class="card-text">${phone.mainFeatures.chipSet}[chip-set]</p>
        
        
    </div>
    `;
    phoneDetails.appendChild(div);
}
// const youtube =()=>{
//     fetch()
// }