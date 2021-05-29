let data = []  // Data User 
let album = [] // Data Album
let photo = [] // Data Photo


// Mengambil Data User Dari JsonPlaceHolder
const getDataUser = async () => {
    await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
            data = json
            //console.log("user json : ", data);
        }
    )
}

const getDataAlbum = async () => {
    await fetch('https://jsonplaceholder.typicode.com/albums')
        .then(response => response.json())
        .then(json => {
            album = json
            //console.log("album json : ", album);
        }
    )
}

const getDataPhoto = async () => {
    await fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(json => {
            photo = json
            //console.log("photo json : ", photo);
        }
    )
}

// Membuat List Name
const listName = () => {
    let namelist = document.querySelector(".row-input select")

    let option = "<option value='please select data'>-- Please Select --</option>"

    for (let index=0; index<data.length; index++) {
        const user = data[index];
        option += `
            <option value="${user.id}">
                ${user.name}
            </option>
            `
    }

    option += `<option value='0'> Select All </option>`

    namelist.innerHTML = option
}



// Select Album From Option List
const searchAlbumForm = () => {
    console.log("submit!!");

    const searchalbumField = document.searchAlbumById.searchid.value
    console.log("album search by User with ID : ", searchalbumField);

    selected_user.length = 0 // If we change the username, the data will be reset to 0 again

    if (searchalbumField == 0) {
        searchAlbumAllUser();
    } else {
        searchAlbumByUserID(searchalbumField);  
    }
}

let selected_user = []

// Select Album By User ID 
const searchAlbumByUserID = (inputId) => {

    for (let index=0; index < data.length; index++) {
        const user = data[index]
        for (let index1=0; index1<album.length; index1++) {
            const album_user = album[index1]
            for (let index2=0; index2<photo.length; index2++){
                const album_photo = photo[index2]
                if (user.id == inputId && user.id == album_user.userId && album_user.id == album_photo.albumId) {

                    const newData = {
                        name:user.name,
                        album:album_user.title,
                        title:album_photo.title,
                        thumbnail:album_photo.thumbnailUrl
                    }

                    selected_user.push(newData)
                } 
            }
        }
    }
    // Display Table 
    //const table = document.querySelector(".pagination-album ul");
    //table.innerHTML = createPaginationAlbum(1)

    // Display Table using pagination
    buildTable()
    renderPageButton()

    console.log("Selected User : ", selected_user)

}

const searchAlbumAllUser = () => {

    console.log("Display All Data")
    
    for (let index=0; index < data.length; index++) {
        const user = data[index]
        for (let index1=0; index1<album.length; index1++) {
            const album_user = album[index1]
            for (let index2=0; index2<photo.length; index2++){
                const album_photo = photo[index2]

                if (album_user.id == album_photo.albumId) {
                    const newData = {
                        name:user.name,
                        album:album_user.title,
                        title:album_photo.title,
                        thumbnail:album_photo.thumbnailUrl
                    }
    
                    selected_user.push(newData)
                }
            }
        }
    }

    // Display Table using next prev pagination
    // const table = document.querySelector(".pagination-album ul");
    // table.innerHTML = createPaginationAlbum(1)


    // Display Table using pagination
    buildTable()
    renderPageButton()

    //console.log("Selected User : ", selected_user)

}

const table = document.querySelector(".pagination-album ul");
/** 
const createPaginationAlbum = (start_page) => {

    let rows = 10;
    let totalPages = Math.round(selected_user.length / rows);
    let page = start_page;  // Start from page 1 
    let liTag = '';

    console.log("Album Pages : ", page)
    console.log("Dari : ", totalPages)

    const pagination = (page, rows) => {
        let table = document.querySelector(".photoList tbody")

        var trimStart = (page - 1) * rows
        var trimEnd = trimStart + rows

        var trimmedUser = selected_user.slice(trimStart, trimEnd)  // trimmedData User

        let tr = ""
        
        // Build the dataset 
        for (let index = 0 ; index < trimmedUser.length; index++) {
            const data = trimmedUser[index]

            tr += `
                <tr>
                    <td>${data.name}</td>
                    <td>${data.album}</td>
                    <td>${data.title}</td>
                    <td>${data.thumbnail}</td>
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
    
    table.innerHTML = liTag; //add li tag inside ul tag
    return liTag; //reurn the li tag
} */

// Make Pagination and Button

var currentIndex = 0
var maxButtonPage = 25
var limit = 10
const buildTable = () => {
    pageStart = currentIndex * limit
    pageEnd = (currentIndex + 1) * limit

    const table = document.querySelector(".photoList tbody")
    const write = selected_user.slice(pageStart,  pageEnd)

    tr = ""

    write.forEach((data) => {
        tr += `
                <tr>
                    <td>${data.name}</td>
                    <td>${data.album}</td>
                    <td>${data.title}</td>
                    <td>${data.thumbnail}</td>
                </tr>
            `
    });

    table.innerHTML = tr;
    renderPageButton()
}

const renderPageButton = () => {
    const pagination = document.querySelector(".pagination ul")
    
    let pageStart = 1
    let pageEnd = maxButtonPage
    const pageTotal = selected_user.length / limit
    const space = Math.floor(maxButtonPage / 2)

    if (currentIndex - space > 0) {
        if (currentIndex + space >= pageTotal) {
            pageStart = pageTotal - maxButtonPage + 1
            pageEnd = pageTotal
        } else {
            pageStart = (currentIndex - space) + 1
            pageEnd = (currentIndex + space) + 1
        }
    }


    let button = `
        <li>
            <span class="prev">
                <i class="fas fa-angle-left"></i> Prev 
            </span>
        </li>
            `
    for (let index = pageStart; index <= pageEnd; index++) {
        // let classSelected = ""
        // if (index == currentIndex + 1) classSelected = "active"

        button += `
                <li>
                    <span class="number ${index == currentIndex + 1 ? "active" : ""}" data-pagination=${index}>${index}</span>
                </li>
                    `
    }
    button += `
                <li>
                    <span class="next">
                        Next <i class="fas fa-angle-left"></i>
                    </span>
                <li>
              `

    pagination.innerHTML = button
}

const nextPage = () => {
    if ((selected_user.length / limit ) > currentIndex + 1) {
        currentIndex += 1
        buildTable()
    }
}

const prevPage = () => {
    if (currentIndex > 0) {
        currentIndex -= 1
        buildTable()
    }
}

const selectPage = self => {
    const selectedIndex = parseInt(self.getAttribute("data-pagination")) - 1
    // console.log("self", selectedIndex);
    currentIndex = selectedIndex
    buildTable()
}

document.addEventListener("click", function (el) {
    if (el.target.classList.contains("next")) {
        nextPage()
    } else if (el.target.classList.contains("prev")) {
        prevPage()
    } else if (el.target.classList.contains("number")) {
        selectPage(el.target)
    }
})



const __init__ = async () => {
    await getDataUser()
    console.log("Data : ", data)

    await getDataAlbum()
    console.log("Album : ", album)

    await getDataPhoto()
    console.log("Photo : ", photo)

    listName()
}

__init__()