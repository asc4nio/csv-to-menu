import { parse } from '../libs/vanillaes-csv/index.js'
import {createDomItem} from './domitem.js'

let items = []

let getNParseData = async () => {
    let url = "./menu/rest-images.csv";
    let response = await fetch(url);
    let data = await response.text();
    let parsedData = await parse(data)

    // console.log(parsedData)

    for (let i = 1; i < parsedData.length; i++) {
        let [iName, iIngr, iCost, iCateg, iGluten, iFreeze, iVeg, iImage] = parsedData[i]

        let item = {
            id: `item${i - 1}`,
            name: iName,
            ingredients: iIngr,
            cost: iCost,
            category: iCateg,
            isGlutenfree: iGluten,
            isFreezed: iFreeze,
            isVegetarian: iVeg,
            imageName: iImage,
            isFav: false
        }

        items.push(item)
    }
}

let placeData = async () => {
    await getNParseData()

    await items.map((item, index) => {
        createDomItem(item, index)
    })

}


let pageInteractions = () => {
    $("#accordion").accordion({
        icons: false,
        heightStyle: "content",
        active: false,
        collapsible: true,
        header: ".food-title"
    });

    $( "#dialog" ).dialog({
        autoOpen: false,
        modal: true,
        draggable: false,
        closeText: "X",
        width: $(window).width()*0.95,
        open: ()=>{
            $('body').addClass('scrolloff')
            $('.ui-widget-overlay').bind('click',function(){
                $('#dialog').dialog('close');
            })
        },
        close: ()=>{
            $('body').removeClass('scrolloff')
        }
    });


    $( ".item-icons" ).on( "click", function() {
        $( "#dialog" ).dialog( "open" );
    });

    // $('.fav-icon').fadeTo(0, 0)


    let itemsQuant = $(".item").length

    for (let i = 0; i < itemsQuant; i++) {
        $(`#item${i}`).on('click', () => {
            let id = `item${i}`
            // console.log(id)
            toggleFavItem(id)
        })

    }

    // $('#fav').hide()
    $('#clear-favs').hide()

    $('#fav-toggle').on('click', () => {
        $('#fav').toggle()
        $('body').toggleClass('scrolloff')
        // $('nav').toggleClass('is--fav')
        $('.nav-icon.navfav-on').toggleClass('is--active')
        $('.nav-icon.navfav-off').toggleClass('is--active')

        // if($('#profile').is(":visible")){
        //     $('#profile').hide()
        //     $('.nav-icon.navprofile').removeClass('is--active')
        // }
        
        updateNav()
    })

    $('#profile-toggle').on('click', () => {
        $('#profile').toggle()
        $('body').toggleClass('scrolloff')
        $('.nav-icon.navprofile').toggleClass('is--active')

        // if($('#fav').is(":visible")){
        //     $('#fav').hide()
        //     $('.nav-icon.navfav-on').removeClass('is--active')
        //     $('.nav-icon.navfav-off').removeClass('is--active')
        // }
    })

    $('#clear-favs').on('click', clearFavs)
}




let buildPage = async () => {
    await placeData()

    pageInteractions()

}

buildPage()


/***************************************************************** */


let toggleFavItem = (id) => {
    let checkIfAlreadyFav = items.find(i => { return i.id === id && i.isFav })
    if (checkIfAlreadyFav) {
        removeItemFromFav(id)
    } else {
        addItemToFav(id)
    }
}
let addItemToFav = (id) => {

    items.find(i => { return i.id === id }).isFav = true


    let $domItem = $(`#${id}`)
    $domItem.find('.fav-icon-on').show()
    $domItem.find('.fav-icon-off').hide()

    let $favDiv = $domItem.clone().attr("id", `fav-${id}`);
    $favDiv.find('.item-image').remove()
    $favDiv.appendTo('#fav-container')

    $domItem.addClass('is--fav')

    $('#clear-favs').show()

    updateNav()

    $favDiv.find('.fav-icon').on('click', () => {
        $favDiv.remove()
        removeItemFromFav(id)
    })
}
let removeItemFromFav = (id) => {

    let $domItem = $(`#${id}`)
    

    $domItem.removeClass('is--fav')
    $domItem.find('.fav-icon-on').hide()
    $domItem.find('.fav-icon-off').show()

    let $favDiv = $(`#fav-${id}`)
    $favDiv.remove()

    items.find(i => { return i.id === id }).isFav = false

    updateNav()

}
let clearFavs = () => {
    $('#fav-container').empty()

    $('.item').removeClass('is--fav')

    $('#clear-favs').hide()

    $('#fav-toggle').click()

    updateNav()
}

let updateNav = ()=>{
    if ( $('#fav-container').children().length > 0 ) {
        $('.navfav-on').show()
        $('.navfav-off').hide()
    } else {
        $('.navfav-on').hide()
        $('.navfav-off').show()
        $('.fav-icon-on').hide()
        $('.fav-icon-off').show()

        $('#clear-favs').hide()
    }
}