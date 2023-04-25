import { parse } from '../libs/vanillaes-csv/index.js'
import { createDomItem } from './domitem.js'

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
            header: ".food-title"
        });
    },
    initPage: () => {
        pageInteractions.initAccordion()
        pageInteractions.initDialog()

        $(".item-icons").on("click", function () {
            $("#dialog").dialog("open");
        });


        let itemsQuant = $(".item").length
        for (let i = 0; i < itemsQuant; i++) {
            $(`#item${i}`).on('click', () => {
                let id = `item${i}`
                favs.toggleFavItem(id)
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
        $favDiv.appendTo('#fav-container')

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

$(window).on("resize", function () {
    pageWidth = $(window).width()
    pageInteractions.initDialog()
});


$(window).on("load", function () {
    $('#loading').hide()
});