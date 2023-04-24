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

/*
export class domItem {
    constructor(item, index) {
        this.item = item
        this.index = index
        this.$divItem = $("<div>", {
            "class": "item",
            "id": `item${this.index}`
        })
    }
    createItem() {
        this.$divItemHead = $("<div>", { "class": "item-head" }).appendTo(this.$divItem)
        $("<h3>", { "class": "title" }).html(this.item.name).appendTo(this.$divItemHead)

        $("<img />", {
            src: icons.find(i => { return i.name === 'fav' }).src,
            alt: icons.find(i => { return i.name === 'fav' }).name,
            class: 'fav-icon'
        }).appendTo(this.$divItemHead)

        $("<div>", { "class": "ingr" }).html(this.item.ingredients).appendTo(this.$divItem)
        this.$divIcons = $("<div>", { "class": "icons" }).appendTo(this.$divItem)
        $("<h3>", { "class": "cost" }).html(this.item.cost).appendTo(this.$divItem)


        // icons
        if (this.item.isGlutenfree === "TRUE") {
            $("<img />", {
                src: icons.find(i => { return i.name === 'glutenfree' }).src,
                alt: icons.find(i => { return i.name === 'glutenfree' }).name
            }).appendTo(this.$divIcons)
        }
        if (this.item.isFreezed === "TRUE") {
            $("<img />", {
                src: icons.find(i => { return i.name === 'freezed' }).src,
                alt: icons.find(i => { return i.name === 'freezed' }).name
            }).appendTo(this.$divIcons)
        }
        if (this.item.isVegetarian === "TRUE") {
            $("<img />", {
                src: icons.find(i => { return i.name === 'vegetarian' }).src,
                alt: icons.find(i => { return i.name === 'vegetarian' }).name
            }).appendTo(this.$divIcons)
        }
    }

    appendToMain(){
        switch (this.item.category) {
            case 'Antipasti':
                this.$divItem.appendTo("#antipasti");
                break;
            case 'Primi':
                this.$divItem.appendTo("#primi");
                break;
            case 'Secondi':
                this.$divItem.appendTo("#secondi");
                break;
            case 'Dessert':
                this.$divItem.appendTo("#dessert");
                break;
            default:
                break;
        }
    }
}
*/

export function createDomItem(item, index){

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
}


/*
let buildItem = (item, index) => {
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
}
*/


