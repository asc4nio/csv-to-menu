const icons = [
    {
        name: 'favitem-off',
        src: "./img/icons/icon-favitem-off.svg"
    },
    {
        name: 'favitem-on',
        src: "./img/icons/icon-favitem-on.svg"
    },
    {
        name: 'glutenfree',
        src: "./img/icons/icon-item-glutenfree.svg"
    },
    {
        name: 'freezed',
        src: "./img/icons/icon-item-freezed.svg"
    },
    {
        name: 'vegetarian',
        src: "./img/icons/icon-item-vegetarian.svg"
    },
    {
        name: 'milkfree',
        src: "./img/icons/icon-item-milkfree.svg"
    },
    {
        name: 'fav',
        src: "./img/dev/icon-star.svg"
    }
]


export function createFoodItem(item, index) {

    let $divItem = $("<div>", {
        "class": "item",
        "id": `item${index}`
    });

    let $divImage = $("<div>", { "class": "item-image pointeroff" }).appendTo($divItem)
    $("<img />", {
        src: `./img/dev/rest-images/${item.imageName}`,
        // alt: icons.find(i => { return i.name === 'fav' }).name,
        class: 'item-image-img'
    }).appendTo($divImage)


    let $divItemHead = $("<div>", { "class": "item-head" }).appendTo($divItem)
    $("<h3>", { "class": "title" }).html(item.name).appendTo($divItemHead)

    $("<img />", {
        src: icons.find(i => { return i.name === 'favitem-off' }).src,
        alt: icons.find(i => { return i.name === 'favitem-off' }).name,
        class: 'fav-icon fav-icon-off'
    }).appendTo($divItemHead)
    $("<img />", {
        src: icons.find(i => { return i.name === 'favitem-on' }).src,
        alt: icons.find(i => { return i.name === 'favitem-on' }).name,
        class: 'fav-icon fav-icon-on'
    }).appendTo($divItemHead)

    $("<div>", { "class": "ingr" }).html(item.ingredients).appendTo($divItem)

    let $divFoot = $("<div>", { "class": "item-foot" }).appendTo($divItem)

    $("<h3>", { "class": "cost" }).html(item.cost).appendTo($divFoot)

    let $divIcons = $('<a>', {
        href: '#',
        class: 'item-icons',
        click: (e) => {
            e.preventDefault()
            e.stopPropagation()
        }
    }).appendTo($divFoot);


    // icons
    if (item.isGlutenfree === "TRUE") {
        $("<img />", {
            src: icons.find(i => { return i.name === 'glutenfree' }).src,
            alt: icons.find(i => { return i.name === 'glutenfree' }).name,
            class: 'item-ingr-icon'
        }).appendTo($divIcons)
    }
    if (item.isFreezed === "TRUE") {
        $("<img />", {
            src: icons.find(i => { return i.name === 'freezed' }).src,
            alt: icons.find(i => { return i.name === 'freezed' }).name,
            class: 'item-ingr-icon'
        }).appendTo($divIcons)
    }
    if (item.isVegetarian === "TRUE") {
        $("<img />", {
            src: icons.find(i => { return i.name === 'vegetarian' }).src,
            alt: icons.find(i => { return i.name === 'vegetarian' }).name,
            class: 'item-ingr-icon'
        }).appendTo($divIcons)
    }
    if (item.isMilkfree === "TRUE") {
        $("<img />", {
            src: icons.find(i => { return i.name === 'milkfree' }).src,
            alt: icons.find(i => { return i.name === 'milkfree' }).name,
            class: 'item-ingr-icon'
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
}


export function createDrinkItem(item, index) {
    // console.log(item)
    let $divItem = $("<div>", {
        "class": "item",
        "id": `drink${index}`
    });

    let $divItemHead = $("<div>", { "class": "item-head" }).appendTo($divItem)
    $("<h3>", { "class": "title" }).html(item.name).appendTo($divItemHead)

    $("<img />", {
        src: icons.find(i => { return i.name === 'favitem-off' }).src,
        alt: icons.find(i => { return i.name === 'favitem-off' }).name,
        class: 'fav-icon fav-icon-off'
    }).appendTo($divItemHead)
    $("<img />", {
        src: icons.find(i => { return i.name === 'favitem-on' }).src,
        alt: icons.find(i => { return i.name === 'favitem-on' }).name,
        class: 'fav-icon fav-icon-on'
    }).appendTo($divItemHead)

    if (item.description !== '') {
        $("<div>", { "class": "drink-descr" }).html(item.description + '<br>' + item.size).appendTo($divItem)
    }
    let $divFoot = $("<div>", { "class": "item-foot" }).appendTo($divItem)

    $("<h3>", { "class": "cost" }).html(item.cost).appendTo($divFoot)

    
    if(item.altSize !== ''){
        let $divAltsize = $("<div>", { "class": "item-altsize" }).appendTo($divItem)
        $("<div>", { "class": "item-altdescr" }).html(item.altSize).appendTo($divAltsize)
        $("<div>", { "class": "item-alcost" }).html(item.altCost).appendTo($divAltsize)
    }


    // append to category
    switch (item.category) {
        case 'Vino rosso':
            $divItem.appendTo("#vini-rossi");
            break;
        case 'Vino bianco':
            $divItem.appendTo("#vini-bianchi");
            break;
        case 'Birra':
            $divItem.appendTo("#birre");
            break;
        case 'Analcolici' || 'Bar':
            $divItem.appendTo("#analcolici");
            break;
        default:
            break;
    }
}