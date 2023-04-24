import { parse } from '../libs/vanillaes-csv/index.js'

let items = []
let favs= []
const icons = [
    {
        name: 'glutenfree',
        src: "./img/restaurant/icon-glutenfree.svg"
    },
    {
        name: 'freezed',
        src: "./img/restaurant/icon-freezed.svg"
    },
    {
        name: 'vegetarian',
        src: "./img/restaurant/icon-vegetarian.svg"
    }
    ,
    {
        name: 'fav',
        src: "./img/icon-star.svg"
    }
]

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

    console.log(items)

    items.map((item, index) => {
        let $divItem = $("<div>", {
            "class": "item",
            "id": `item${index}`
        });


        let $divItemHead = $("<div>", { "class": "item-head" }).appendTo($divItem)
        $("<h3>", { "class": "title" }).html(item.name).appendTo($divItemHead)

        $("<img />", {
            src: icons.find(i => { return i.name === 'fav' }).src,
            alt: icons.find(i => { return i.name === 'fav' }).name,
            class: 'fav-icon'
        }).appendTo($divItemHead)

        $("<div>", { "class": "ingr" }).html(item.ingredients).appendTo($divItem)
        let $divIcons = $("<div>", { "class": "icons" }).appendTo($divItem)
        $("<h3>", { "class": "cost" }).html(item.cost).appendTo($divItem)


        // icons
        if (item.isGlutenfree === "TRUE") {
            $("<img />", {
                src: icons.find(i => { return i.name === 'glutenfree' }).src,
                alt: icons.find(i => { return i.name === 'glutenfree' }).name
            }).appendTo($divIcons)
        }
        if (item.isFreezed === "TRUE") {
            $("<img />", {
                src: icons.find(i => { return i.name === 'freezed' }).src,
                alt: icons.find(i => { return i.name === 'freezed' }).name
            }).appendTo($divIcons)
        }
        if (item.isVegetarian === "TRUE") {
            $("<img />", {
                src: icons.find(i => { return i.name === 'vegetarian' }).src,
                alt: icons.find(i => { return i.name === 'vegetarian' }).name
            }).appendTo($divIcons)
        }


        // append to category
        switch (item.category) {
            case 'Antipasti':
                $divItem.appendTo("#antipasti");
                break;
            case 'Primi':
                $divItem.appendTo("#primi");
                break;
            case 'Secondi':
                $divItem.appendTo("#secondi");
                break;
            case 'Dessert':
                $divItem.appendTo("#dessert");
                break;
            default:
                break;
        }
    })

}
let pageInteractions = () => {
    $("#accordion").accordion({
        icons: false,
        heightStyle: "content",
        active: false,
        collapsible: true
    });

    $('.fav-icon').fadeTo( 0, 0 )


    let itemsQuant = $(".item").length

    for(let i=0; i<itemsQuant; i++){
        $(`#item${i}`).on('click',()=>{
            let id = `item${i}`
            console.log(id)
            itemToFav(id)
        })

    }

    $('#fav').hide()
    $('#clear-favs').hide()

    $('#fav-toggle').on('click', ()=>{
        $('#fav').toggle()
        $('main').toggleClass('scrolloff')
        $('nav').toggleClass('is--fav')
    })

    $('#clear-favs').on('click',clearFavs)
}


let buildPage = async () => {
    await placeData()

    pageInteractions()

}

buildPage()




let itemToFav = (id)=>{
    let check = favs.find(i => { return i.id === id })
    if (check){
        console.log('check2')
        removeItemFromFav(id)
    } else {
        addItemToFav(id)
    }

    console.log('favs',favs)

}

let addItemToFav = (id)=>{
    let item = items.find(i => { return i.id === id })

    $(`#${id} .item-head .fav-icon`).fadeTo( 0, 1 )

    favs.push(item)
    // console.log(favs)

    let $favDiv = $(`#${id}`).clone().attr("id",`fav-${id}`);
    // $favDiv.find('.fav-icon').remove()

    $favDiv.appendTo('#fav-container')
    $(`#${id}`).addClass('is--fav')

    $('#clear-favs').show()

    $favDiv.find('.fav-icon').on('click',()=>{
        $favDiv.remove()
        removeItemFromFav(id)
    })
}

let removeItemFromFav = (id)=>{
    let item = favs.find(i => { return i.id === id })
    let index = favs.indexOf(item);
    favs.splice(index, 1);

    $(`#${id} .item-head .fav-icon`).fadeTo( 0, 0 )

    $(`#fav-container #fav-${id}`).remove()
    
    $(`#${id}`).removeClass('is--fav')
}

let clearFavs = ()=>{
    $('#fav-container').empty()
    favs = []
    $('.item').removeClass('is--fav')
    $(`.fav-icon`).fadeTo( 0, 0 )

    $('#clear-favs').hide()

    $('#fav-toggle').click()

    console.log('cleared', favs)
}