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


export function createDomItem(item, index){

    let $divItem = $("<div>", {
        "class": "item",
        "id": `item${index}`
    });

    let $divImage = $("<div>", { "class": "item-image" }).appendTo($divItem)
    $("<img />", {
        src: `./img/rest-images/${item.imageName}`,
        // alt: icons.find(i => { return i.name === 'fav' }).name,
        class: 'item-image-img'
    }).appendTo($divImage)


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
}
