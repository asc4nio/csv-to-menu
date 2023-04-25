import { parse } from '../libs/vanillaes-csv/index.js'
import { createFoodItem, createDrinkItem } from './domitem.js'

let items = []
let drinks = []

let getNParseData = async () => {
    let url = "./menu/food-images-eng.csv";
    let response = await fetch(url);
    let data = await response.text();
    let parsedData = await parse(data)

    // console.log(parsedData)

    for (let i = 1; i < parsedData.length; i++) {
        let [iName, iIngr, iCost, iCateg, iGluten, iFreeze, iVeg, iMilk, iImage] = parsedData[i]

        let item = {
            id: `item${i - 1}`,
            name: iName,
            ingredients: iIngr,
            cost: iCost,
            category: iCateg,
            isGlutenfree: iGluten,
            isFreezed: iFreeze,
            isVegetarian: iVeg,
            isMilkfree: iMilk,
            imageName: iImage,

            isFav: false
        }

        items.push(item)
    }
}
let getNParseDrinks = async () => {
    let url = "./menu/drinks-eng.csv";
    let response = await fetch(url);
    let data = await response.text();
    let parsedData = await parse(data)

    // console.log(parsedData)

    for (let i = 1; i < parsedData.length; i++) {
        let [iName, iDescr, iSize, iCost, iAltSize, iAltCost, iCateg] = parsedData[i]

        let item = {
            id: `drink${i - 1}`,
            name: iName,
            description: iDescr,
            size: iSize,
            cost: iCost,
            altSize: iAltSize,
            altCost: iAltCost,
            category: iCateg,

            isFav: false
        }

        drinks.push(item)
    }
}
let placeData = async () => {
    await getNParseData()
    await getNParseDrinks()

    await items.map((item, index) => {
        createFoodItem(item, index)
    })

    await drinks.map((item, index) => {
        createDrinkItem(item, index)
    })
}

/***************************************************************** */

let pageWidth = $(window).width()

window.pageInteractions = {
    initDialog: () => {
        $("#dialog").dialog({
            autoOpen: false,
            modal: true,
            draggable: false,
            closeText: "X",
            width: pageWidth * 0.95,
            maxWidth: 540,
            open: () => {
                $('body').addClass('scrolloff')
                $('.ui-widget-overlay').bind('click', function () {
                    $('#dialog').dialog('close');
                })
            },
            close: () => {
                $('body').removeClass('scrolloff')
            }
        });
    },
    initAccordion: () => {
        $("#accordion").accordion({
            icons: false,
            heightStyle: "content",
            active: false,
            collapsible: true,
            header: ".accordion-title"
        });
    },
    initPage: () => {
        pageInteractions.initAccordion()
        pageInteractions.initDialog()

        $(".item-icons").on("click", function () {
            $("#dialog").dialog("open");
        });


        let itemsQuant = items.length
        for (let i = 0; i < itemsQuant; i++) {
            $(`#item${i}`).on('click', () => {
                let id = `item${i}`
                favs.toggleFavItem(id)
            })
        }

        let drinksQuant = drinks.length
        for (let i = 0; i < drinksQuant; i++) {
            $(`#drink${i}`).on('click', () => {
                let id = `drink${i}`
                favs.toggleDrinkItem(id)
            })
        }

        $('#clear-favs').hide()

        $('#fav-toggle').on('click', favs.toggleView)

        $('#profile-toggle').on('click', profile.toggleView)

        $('#clear-favs').on('click', favs.clearFavs)

        $('.overlay-back').on('click', ()=>{
            if (profile.isOpen) {
                profile.toggleView()
            }
            if (favs.isOpen) {
                favs.toggleView()
            }
        })
    }

}

/***************************************************************** */

window.favs = {
    isOpen: false,
    toggleFavItem: (id) => {
        let checkIfAlreadyFav = items.find(i => { return i.id === id && i.isFav })
        if (checkIfAlreadyFav) {
            favs.removeItemFromFav(id)
        } else {
            favs.addItemToFav(id)
        }
    },
    addItemToFav: (id) => {

        items.find(i => { return i.id === id }).isFav = true

        let $domItem = $(`#${id}`)
        $domItem.find('.fav-icon-on').show()
        $domItem.find('.fav-icon-off').hide()

        let $favDiv = $domItem.clone().attr("id", `fav-${id}`).addClass('is--favlist')
        $favDiv.find('.item-image').remove()
        $favDiv.prependTo('#fav-container')

        $domItem.addClass('is--fav')

        $('#clear-favs').show()

        updateNav()

        $favDiv.find('.fav-icon').on('click', () => {
            $favDiv.remove()
            favs.removeItemFromFav(id)
        })
    },
    removeItemFromFav: (id) => {

        let $domItem = $(`#${id}`)


        $domItem.removeClass('is--fav')
        $domItem.find('.fav-icon-on').hide()
        $domItem.find('.fav-icon-off').show()

        let $favDiv = $(`#fav-${id}`)
        $favDiv.remove()

        items.find(i => { return i.id === id }).isFav = false

        updateNav()

    },
    toggleDrinkItem: (id) => {
        let checkIfAlreadyFav = drinks.find(i => { return i.id === id && i.isFav })
        if (checkIfAlreadyFav) {
            favs.removeDrinkFromFav(id)
        } else {
            favs.addDrinkToFav(id)
        }
    },
    addDrinkToFav: (id) => {

        drinks.find(i => { return i.id === id }).isFav = true

        let $domItem = $(`#${id}`)
        $domItem.find('.fav-icon-on').show()
        $domItem.find('.fav-icon-off').hide()

        let $favDiv = $domItem.clone().attr("id", `fav-${id}`).addClass('is--favlist')
        $favDiv.appendTo('#fav-container')

        $domItem.addClass('is--fav')

        $('#clear-favs').show()

        updateNav()

        $favDiv.find('.fav-icon').on('click', () => {
            $favDiv.remove()
            favs.removeDrinkFromFav(id)
        })
    },
    removeDrinkFromFav: (id) => {

        let $domItem = $(`#${id}`)

        $domItem.removeClass('is--fav')
        $domItem.find('.fav-icon-on').hide()
        $domItem.find('.fav-icon-off').show()

        let $favDiv = $(`#drink-${id}`)
        $favDiv.remove()

        drinks.find(i => { return i.id === id }).isFav = false

        updateNav()

    },
    clearFavs: () => {
        $('#fav-container').empty()

        $('.item').removeClass('is--fav')

        $('#clear-favs').hide()

        $('#fav-toggle').click()

        updateNav()
    },
    toggleView: () => {

        if (profile.isOpen) {
            profile.toggleView()
        }

        if (favs.isOpen) {
            $('#fav').hide()
            $('body').removeClass('scrolloff')
            $('.nav-icon.navfav-on').removeClass('is--active')
            $('.nav-icon.navfav-off').removeClass('is--active')
            $('#fav-toggle').removeClass('is--active')
        } else {
            history.pushState({}, '');
            $('#fav').show()
            $('body').addClass('scrolloff')
            $('.nav-icon.navfav-on').addClass('is--active')
            $('.nav-icon.navfav-off').addClass('is--active')
            $('#fav-toggle').addClass('is--active')
        }

        favs.isOpen = !favs.isOpen

        updateNav()

    }

}

window.profile = {
    isOpen: false,
    toggleView: () => {

        if (favs.isOpen) {
            favs.toggleView()
        }

        if (profile.isOpen) {
            $('#profile').hide()
            $('body').removeClass('scrolloff')
            $('.nav-icon.navprofile').removeClass('is--active')
            $('#profile-toggle').removeClass('is--active')
        } else {
            history.pushState({}, '');
            $('#profile').show()
            $('body').addClass('scrolloff')
            $('.nav-icon.navprofile').addClass('is--active')
            $('#profile-toggle').addClass('is--active')
        }

        profile.isOpen = !profile.isOpen

    }
}

let updateNav = () => {
    if ($('#fav-container').children().length > 0) {
        $('.navfav-on').show()
        $('.navfav-off').hide()
        $('#no-fav-text').hide()
    } else {
        $('.navfav-on').hide()
        $('.navfav-off').show()
        $('.fav-icon-on').hide()
        $('.fav-icon-off').show()
        $('#no-fav-text').show()

        $('#clear-favs').hide()
    }
}

/***************************************************************** */

const buildPage = (async () => {
    await placeData()
    pageInteractions.initPage()
})()

$(window).on("load", function () {
    setTimeout(() => {
        $('#loading').hide() 
    }, 200);
});


/***************************************************************** */


$(window).on("resize", function () {
    pageWidth = $(window).width()
    pageInteractions.initDialog()
});


if(navigator.userAgent.match(/SAMSUNG|Samsung|SGH-[I|N|T]|GT-[I|N]|SM-[A|N|P|T|Z]|SHV-E|SCH-[I|J|R|S]|SPH-L/i)) {
    console.log("it's Samsung");
    $('nav').addClass('is--samsung')
    $('main').addClass('is--samsung')
    $('.overlay').addClass('is--samsung')
}

window.onpopstate = function() {
    if (profile.isOpen) {
        profile.toggleView()
    }
    if (favs.isOpen) {
        favs.toggleView()
    }
};