/* Desenvolva sua lógica aqui... */

const tagUL = document.getElementById("main-ul")
const divAside = document.querySelector(".optional-user")


function cardLi(data) {

    let tagLI = document.createElement("li")
    tagLI.classList.add("card-li")
    tagLI.id = data.id

    let titleCard = document.createElement("h4")
    titleCard.classList.add("title-card")
    titleCard.innerText = data.title

    let areaInfo = document.createElement("div")
    areaInfo.classList.add("area-info")

    let infoSpan1 = document.createElement("span")
    infoSpan1.classList.add("tag-info")
    infoSpan1.innerText = data.enterprise

    let infoSpan2 = document.createElement("span")
    infoSpan2.classList.add("tag-info")
    infoSpan2.innerText = data.location

    let descriptionCard = document.createElement("p")
    descriptionCard.classList.add("text-card")
    descriptionCard.innerText = data.descrition

    let divInteration = document.createElement("div")
    divInteration.classList.add("interation-user")

    let divSpansCategory = document.createElement("div")
    divSpansCategory.classList.add("area-category")

    let spanJob1 = document.createElement("span")
    spanJob1.classList.add("tag-category")
    spanJob1.innerText = data.modalities[0]


    let spanJob2 = document.createElement("span")
    spanJob2.classList.add("tag-category")
    spanJob2.innerText = data.modalities[1]


    let buttonUser = document.createElement("button")
    buttonUser.classList.add("btn-user")
    buttonUser.innerText = "Candidatar"
    buttonUser.id = data.id
    buttonUser.addEventListener('click', (event) => {
        if (event.target.innerText == "Candidatar") {
            buttonUser.innerText = "Remover Candidatura"
        }
        else {
            buttonUser.innerText = "Candidatar"
        }
    })



    areaInfo.append(infoSpan1, infoSpan2)
    divSpansCategory.append(spanJob1, spanJob2)
    divInteration.append(divSpansCategory, buttonUser)
    tagLI.append(titleCard, areaInfo, descriptionCard, divInteration)

    return tagLI
}

const cardsCreate = (dom) => {
    tagUL.innerHTML= ""

    dom.forEach((initial) => {

        tagUL.appendChild(cardLi(initial))

    })
}

cardsCreate(jobsData)



const arrNew = [];


const buttonCard = document.getElementsByClassName("btn-user")
const buttonUser = Array.from(buttonCard)
const buttonTrash = document.querySelectorAll(".btn-remove")

buttonUser.forEach((button) => {
    button.addEventListener('click', (event) => {
        jobsData.forEach(element => {
            if (event.target.id == element.id && event.target.innerText == "Remover Candidatura") {
                arrNew.push(element)
            }
        })
            if (event.target.innerText == "Candidatar") {
            const liReady = document.getElementsByClassName("cardAdc")
            const liForAside = Array.from(liReady)

            liForAside.forEach((element) => {
                if (event.target.id == element.id) {
                    element.remove()
                }
            })


        }
        if (arrNew.length > 0) {
            divAside.innerHTML = ""
            selectCardJob(arrNew)
            
        }
        
        if(event.target.innerText == "Candidatar"){
            const liReady = document.getElementsByClassName("cardAdc")
            const liForAside = Array.from(liReady)

            liForAside.forEach((element) => {
                if (event.target.id == element.id) {
                    element.remove()
                }
            })
            let searchIndex = arrNew.findIndex((element) => {
                return element.id == event.target.id
                
            })
            arrNew.splice(searchIndex, 1)

        }
        if (!arrNew.length) {
            divAside.innerHTML = ""
            asideDiv()
        }

        let saveInfo = JSON.stringify(arrNew)
        localStorage.setItem('favorites', saveInfo)

    })


})





function selectCardJob() {

    let tagUlAdc = document.createElement("ul")
    tagUlAdc.classList.add("tagULAdc")


    arrNew.forEach((element) => {

        let tagLIAdc = document.createElement("li")
        tagLIAdc.classList.add("cardAdc")
        tagLIAdc.id = element.id

        let divAreaAdc = document.createElement("div")
        divAreaAdc.classList.add("area-adc")

        let tagH5Adc = document.createElement("h5")
        tagH5Adc.classList.add("h5-adc")
        tagH5Adc.innerText = element.title


        let buttonRemove = document.createElement("button")
        buttonRemove.classList.add("btn-remove")
        buttonRemove.id = element.id
        
        buttonRemove.addEventListener('click', (event)=>{
            buttonUser.forEach((element) =>{
                if(element.id == event.target.id){

                    element.innerText = "Candidatar"
                }
            })

            let searchButton = arrNew.findIndex((element) => {
                return element.id == event.target.id
                
            })
            arrNew.splice(searchButton, 1)
            tagLIAdc.remove()

            if(!arrNew.length){
                divAside.innerHTML = ""
                asideDiv()
            }
        })


        let imgAdc = document.createElement("img")
        imgAdc.src = "./assets/img/trash.png"
        imgAdc.classList.add("imgAdc")
        imgAdc.id = element.id

        let divCategoryAdc = document.createElement("div")
        divCategoryAdc.classList.add("category-adc")

        let spanAdc1 = document.createElement("span")
        spanAdc1.classList.add("spanAdc")
        spanAdc1.innerText = element.enterprise

        let spanAdc2 = document.createElement("span")
        spanAdc2.classList.add("spanAdc")
        spanAdc2.innerText = element.location

        buttonRemove.append(imgAdc)
        divAreaAdc.append(tagH5Adc, buttonRemove)
        divCategoryAdc.append(spanAdc1, spanAdc2)
        tagLIAdc.append(divAreaAdc, divCategoryAdc)
        tagUlAdc.appendChild(tagLIAdc)
        divAside.appendChild(tagUlAdc)
    })
}

function asideDiv() {
    let divEmpty = document.createElement("div")
    divEmpty.classList.add("emptyDiv")

    let tagH5 = document.createElement("h5")
    tagH5.classList.add("h5Empty")
    tagH5.innerText = "Você ainda não aplicou para nenhuma vaga"


    let divImg = document.createElement("div")
    divImg.classList.add("divImg")

    let imgEmoji = document.createElement("img")
    imgEmoji.classList.add("img-empty")
    imgEmoji.src = "./assets/img/interrogação.jpg"


    divImg.appendChild(imgEmoji)
    divEmpty.append(tagH5, divImg)
    divAside.appendChild(divEmpty)
}
asideDiv()














