import { parse } from '../libs/vanillaes-csv/index.js'
import {createDomItem} from './fav-domitem.js'

let items = []
let favs = []

let getNParseData = async () => {
    let url = "./menu/restaurant.csv";
    let response = await fetch(url);
    let data = await response.text();
    let parsedData = await parse(data)

    // console.log(parsedData)

    for (let i = 1; i < parsedData.length; i++) {
        let [iName, iIngr, iCost, iCateg, iGluten, iFreeze, iVeg] = parsedData[i]

        let item = {
            id: `item${i - 1}`,
            name: iName,
            ingredients: iIngr,
            cost: iCost,
            category: iCateg,
            isGlutenfree: iGluten,
            isFreezed: iFreeze,
            isVegetarian: iVeg
        }

        items.push(item)
    }
}

let placeData = async () => {
    await getNParseData()

    await items.map((item, index) => {
        // buildItem(item, index)

        createDomItem(item, index)

        // let $domItem = new domItem(item, index)
        // $domItem.createItem()
        // $domItem.appendToMain()
    })

}


let pageInteractions = () => {
    $("#accordion").accordion({
        icons: false,
        heightStyle: "content",
        active: false,
        collapsible: true
    });

    $('.fav-icon').fadeTo(0, 0)


    let itemsQuant = $(".item").length

    for (let i = 0; i < itemsQuant; i++) {
        $(`#item${i}`).on('click', () => {
            let id = `item${i}`
            console.log(id)
            toggleFav(id)
        })

    }

    $('#fav').hide()
    $('#clear-favs').hide()

    $('#fav-toggle').on('click', () => {
        $('#fav').toggle()
        $('main').toggleClass('scrolloff')
        $('nav').toggleClass('is--fav')
    })

    $('#clear-favs').on('click', clearFavs)
}




let buildPage = async () => {
    await placeData()

    pageInteractions()

}

buildPage()




let toggleFav = (id) => {
    let checkIfAlreadyFav = favs.find(i => { return i.id === id })
    if (checkIfAlreadyFav) {
        console.log('was in fav')
        removeItemFromFav(id)
    } else {
        addItemToFav(id)
    }

    console.log('favs', favs)

}


let addItemToFav = (id) => {
    let item = items.find(i => { return i.id === id })
    favs.push(item)
    // console.log(favs)

    let $domItem = $(`#${id}`)
    $domItem.find('.fav-icon').fadeTo(0, 1)

    let $favDiv = $domItem.clone().attr("id", `fav-${id}`);

    $favDiv.appendTo('#fav-container')

    $domItem.addClass('is--fav')

    $('#clear-favs').show()

    $favDiv.find('.fav-icon').on('click', () => {
        $favDiv.remove()
        removeItemFromFav(id)
    })
}

let removeItemFromFav = (id) => {
    let fav = favs.find(i => { return i.id === id })
    let index = favs.indexOf(fav);
    favs.splice(index, 1);

    let $domItem = $(`#${id}`)
    let $favDiv = $(`fav-${id}`)

    $domItem.removeClass('is--fav')
    $domItem.find('.fav-icon').fadeTo(0, 0)

    $favDiv.remove()
}

let clearFavs = () => {
    $('#fav-container').empty()
    favs = []
    $('.item').removeClass('is--fav')
    $(`.fav-icon`).fadeTo(0, 0)

    $('#clear-favs').hide()

    $('#fav-toggle').click()

    console.log('cleared', favs)
}
