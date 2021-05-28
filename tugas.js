// Pengambilan Data Menggunakan Teknik Promise
let data_user = []

let photos = []

const getAPI = async () => {
    let data = []
    await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
            data = json
            console.log("json", data);
        })
    console.log("data", data);

    // Looping Buat Bikin Data User 
    for (let index=0; index<data.length; index++) {
        const user = data[index];
        console.log("User : ", user, index);
        data_user.push(user)
    }
    console.log("Data Users :", data_user)

    // map
    const result = data.map(user => user.name)
    console.log("result", result);

    renderTable() // Input Data into table

    listName()  // List Name For Search Album

    // for Pagination
    const element = document.querySelector(".pagination ul");

    //calling function with passing parameters and adding inside element which is ul tag
    element.innerHTML = createPagination(1);

    getPhotos()

    // //Table For Album Document
    //const element_table = document.querySelector(".pagination-album ul");
    
    // //calling function with passing parameters and adding inside album element which is ul tag
    //element_table.innerHTML = createPaginationAlbum(1);
    
}

const getPhotos = async () => {
    let photos_data = []
    await fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(json => {
            photos_data = json
            console.log("json", photos_data);
        })
    console.log("data photos : ", photos_data);

    // Looping uat Bikin Data Photo
    for (let index=0; index<photos_data.length; index++) {
        const photo = photos_data[index];
        photos.push(photo)
    }
    console.log("Photo : ", photos)
}

getAPI()

//getPhotos()

const renderTable = () => {
    let table = document.querySelector(".userList tbody");

    let tr= ""

    for (let index=0; index<data_user.length; index++) {
        const user = data_user[index];

        tr += `
            <tr>
                <td align="center">${index + 1}</td>
                <td align="center">${user.name}</td>
                <td align="center">${user.email}</td>
                <td align="center">${user.username}</td>
                <td align="center">${user.website}</td>
                <td align="center">
                    <button class="edit-data" onclick="editUser(${index})">Edit</button>
                    <button class="delete-data" onclick="deleteData(${index})" >Delete</button>
                    <button class="detail-data" onclick="" >Details</button>
                </td>
            </tr>
        `
    }
    table.innerHTML = tr
}

//// Search Data in the table
// Search By Name 

const searchNameForm = () => {
    console.log("submit!!");

    const searchnameField = document.searchByName.searchname.value
    console.log("search name : ", searchnameField);

    searchByName(searchnameField);
}

const searchByName = (inputName) => {
    let table = document.querySelector(".userList tbody");

    let tr= ""
    for (let index=0; index<data_user.length; index++) {
        const user = data_user[index]

        if (user.name == inputName) {
            tr += `
            <tr>
                <td align="center">${index + 1}</td>
                <td align="center">${user.name}</td>
                <td align="center">${user.email}</td>
                <td align="center">${user.username}</td>
                <td align="center">${user.website}</td>
                <td align="center">
                    <button class="edit-data" onclick="editUser(${index})">Edit</button>
                    <button class="delete-data" onclick="deleteData(${index})" >Delete</button>
                    <button class="detail-data" onclick="" >Details</button>
                </td>
            </tr>
        `
        }
    }

    table.innerHTML = tr
}

// Search Data By Username 

const searchUsernameForm = () => {
    console.log("submit!!");

    const searchusernameField = document.searchByUsername.searchusername.value
    console.log("search username : ", searchusernameField);

    searchByUserName(searchusernameField);
}

const searchByUserName = (inputName) => {
    let table = document.querySelector(".userList tbody");

    let tr= ""
    for (let index=0; index<data_user.length; index++) {
        const user = data_user[index]

        if (user.username == inputName) {
            tr += `
            <tr>
                <td align="center">${index + 1}</td>
                <td align="center">${user.name}</td>
                <td align="center">${user.email}</td>
                <td align="center">${user.username}</td>
                <td align="center">${user.website}</td>
                <td align="center">
                    <button class="edit-data" onclick="editUser(${index})">Edit</button>
                    <button class="delete-data" onclick="deleteData(${index})" >Delete</button>
                    <button class="detail-data" onclick="" >Details</button>
                </td>
            </tr>
        `
        }
    }

    table.innerHTML = tr
}

//// Adding User
const onSaveForm = () => {
    console.log("submit!!");

    const indexField = document.userInput.idx.value
    const nameField = document.userInput.name.value
    const emailField = document.userInput.email.value
    const usernameField = document.userInput.username.value
    const websiteField = document.userInput.website.value

    console.log("nameField : ", nameField);
    console.log("emailField : ", emailField);
    console.log("usernameField : ", usernameField);
    console.log("websiteField : ", websiteField);

    /** 
    users.push({
        name: nameField,
        gender: genderField,
        religion: religionField,
        address:addressField
    })*/
    
    const newData = {
        name: nameField,
        email: emailField,
        username: usernameField,
        website: websiteField
    }

    if (indexField) {
        data_user.splice(indexField, 1, newData)
    } else {
        data_user.push(newData)
    }
    renderTable()
    document.userInput.reset()

}

//// Edit User
const editUser = selectedIndex => {

    console.clear()
    console.log("Edit User Start!!!");

    const user = data_user[selectedIndex]
    let nameField = document.userInput.name
    let indexField = document.userInput.idx
    let emailField = document.userInput.email.value
    let usernameField = document.userInput.username.value
    let websiteField = document.userInput.website.value

    indexField.value = selectedIndex
    nameField.value = user.name

    console.log("nameField : ", nameField);
    console.log("emailField : ", emailField);
    console.log("usernameField : ", usernameField);
    console.log("websiteField : ", websiteField);

    console.log("Edit Selesai !!!!");

}

//// Delete User

const deleteData = (index) => {
    data_user.splice(index, 1);

    renderTable();
}

//// Search Album By Name 

// make list option based by name 
const listName = () => {
    //let namelist = document.getElementsByName("searchalbum")
    let namelist = document.querySelector(".row-input select")

    let option = "<option value=''>-- Please Select --</option>";
    for (let index=0; index<data_user.length; index++) {
        const user = data_user[index];
        option += `
            <option value="${user.username}">
                ${user.name}
            </option>
            `;
    }

    namelist.innerHTML = option
}
let selected_user = []
// Search Album Function
const searchAlbumForm = () => {
    console.log("submit!!");

    const searchalbumField = document.searchAlbumById.searchalbum.value
    console.log("album search by : ", searchalbumField);

    selected_user.length = 0 // If we change the username, the data will be reset to 0 again

    searchAlbumByUserID(searchalbumField);

    
}



const searchAlbumByUserID = (inputName) => {
    let table = document.querySelector(".photoList tbody");

    let tr= ""
    for (let index=0; index<data_user.length; index++) {
        const user = data_user[index]

        if (user.username == inputName) {

            for (let index1=0; index1<photos.length; index1++) {
                const photo_user = photos[index1]
                
                // Checking the user id macth the photo id 
                if (photo_user.albumId == user.id) {
                    selected_user.push(photo_user)
                    /** 
                    tr += `
            <tr>
                <td align="center">
                    <a>${photo_user.id}</a>
                    <br>
                    <img class="photo-user" src="${photo_user.url}" width="300px" height="300px">
                    <br>
                    <h3 class="caption">
                        ${photo_user.title}
                    </h3>
                </td>
            </tr>
                    `
                    */
                    
                }
            }
            console.log("Selected User : ", selected_user)

            //Table For Album Document
            const element_table = document.querySelector(".pagination-album ul");
    
            //calling function with passing parameters and adding inside album element which is ul tag
            element_table.innerHTML = createPaginationAlbum(1);

            //selected_user = []
        } 
        
    }
    //table.innerHTML = tr
}

//// Pagination

// selecting required element
const element = document.querySelector(".pagination ul");

// Make Create Pagination Function for Pagination system + modified by data table
const createPagination= (start_page) => {

    console.log(data_user.length)

    //let totalPages = data_user.length / 1;
    let rows = 5;
    let totalPages = Math.round(data_user.length / rows);
    let page = start_page;  // Start from page 1 
    let liTag = '';
    //let active;
    //let beforePage = page - 1;
    //let afterPage = page + 1;

    console.log("Pages : ", page)

    const pagination = (page, rows) => {
        var trimStart = (page - 1) * rows
        var trimEnd = trimStart + rows

        var trimmedData = data_user.slice(trimStart, trimEnd)

        //var pages = Math.floor(data_user.length / rows);

        let table = document.querySelector(".userList tbody")

        for (let index = 0 ; index < trimmedData.length; index++) {
            const data = trimmedData[index]

            tr += `
            <tr>
                <td align="center">${data.id}</td>
                <td align="center">${data.name}</td>
                <td align="center">${data.email}</td>
                <td align="center">${data.username}</td>
                <td align="center">${data.website}</td>
                <td align="center">
                    <button class="edit-data" onclick="editUser(${index})">Edit</button>
                    <button class="delete-data" onclick="deleteData(${index})" >Delete</button>
                    <button class="detail-data" onclick="" >Details</button>
                </td>
            </tr>
                    `
        }
        table.innerHTML = tr;
    }

    let tr = ""
    if (page == 1) {
        // Show the next button when page == 1 
        liTag += `
            <li class="first numb" onclick="">
                <span>
                    1
                </span>
            </li>
            <li class="btn next" onclick="createPagination(${page+1})">
                <span>
                    Next <i class="fas fa-angle-right"></i>
                </span>
            </li>
        `  
        pagination(page, rows) 
    }

    if (page != 1 && page != totalPages) {
        // If we push next button
        
        liTag += `
            <li class="btn next" onclick="createPagination(${page-1})">
                <span>
                    Prev <i class="fas fa-angle-left"></i>
                </span>
            </li>
            <li class="first numb" onclick="">
                <span>
                    ${page}
                </span>
            </li>
            <li class="btn next" onclick="createPagination(${page+1})">
                <span>
                    Next <i class="fas fa-angle-right"></i>
                </span>
            </li>
        `
        pagination(page, rows)
    }

    if (page == totalPages) {
        
        liTag += `
            <li class="btn next" onclick="createPagination(${page-1})">
                <span>
                    Prev <i class="fas fa-angle-left"></i>
                </span>
            </li>
            <li class="first numb" onclick="">
                <span>
                    ${page}
                </span>
            </li>
        `
        pagination(page, rows)
        
    }

    element.innerHTML = liTag; //add li tag inside ul tag
    return liTag; //reurn the li tag
}


// Make Pagination For Photos Album
// selecting required element\


const element_table = document.querySelector(".pagination-album ul");

// Make Create Pagination Function for Pagination system + modified by data table
const createPaginationAlbum = (start_page) => {

    //console.log("Photo User sebanyak : ", selected_user.length)

    //let totalPages = data_user.length / 1;
    let rows = 2;
    let totalPages = Math.round(selected_user.length / rows);
    let page = start_page;  // Start from page 1 
    let liTag = '';
    //let active;
    //let beforePage = page - 1;
    //let afterPage = page + 1

    console.log("Album Pages : ", page)
    console.log("Dari : ", totalPages)

    const pagination = (page, rows) => {
        var trimStart = (page - 1) * rows
        var trimEnd = trimStart + rows

        var trimmedData = selected_user.slice(trimStart, trimEnd)

        //var pages = Math.floor(data_user.length / rows);

        let table = document.querySelector(".photoList tbody")

        for (let index = 0 ; index < trimmedData.length; index++) {
            const data = trimmedData[index]

            tr += `
            <tr>
                <td align="center">
                    <a>${data.id}</a>
                    <br>
                    <img class="photo-user" src="${data.url}" width="300px" height="300px">
                    <br>
                    <h3 class="caption">
                        ${data.title}
                    </h3>
                </td>
            </tr>
                    `
        }
        table.innerHTML = tr;

    }

    let tr = ""
    if (page == 1) {
        // Show the next button when page == 1 
        liTag += `
            <li class="first numb" onclick="">
                <span>
                    1
                </span>
            </li>
            <li class="btn next" onclick="createPaginationAlbum(${page+1})">
                <span>
                    Next <i class="fas fa-angle-right"></i>
                </span>
            </li>
        `  
        pagination(page, rows) 
    }

    if (page != 1 && page != totalPages) {
        // If we push next button
        
        liTag += `
            <li class="btn next" onclick="createPaginationAlbum(${page-1})">
                <span>
                    Prev <i class="fas fa-angle-left"></i>
                </span>
            </li>
            <li class="first numb" onclick="">
                <span>
                    ${page}
                </span>
            </li>
            <li class="btn next" onclick="createPaginationAlbum(${page+1})">
                <span>
                    Next <i class="fas fa-angle-right"></i>
                </span>
            </li>
        `
        pagination(page, rows)
    }

    if (page == totalPages) {
        
        liTag += `
            <li class="btn next" onclick="createPaginationAlbum(${page-1})">
                <span>
                    Prev <i class="fas fa-angle-left"></i>
                </span>
            </li>
            <li class="first numb" onclick="">
                <span>
                    ${page}
                </span>
            </li>
        `
        pagination(page, rows)
        
    }
    
    element_table.innerHTML = liTag; //add li tag inside ul tag
    return liTag; //reurn the li tag
}








