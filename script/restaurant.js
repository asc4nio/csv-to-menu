import { parse } from '../libs/vanillaes-csv/index.js'

let items = []
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
]

let getNParseData = async () => {
    let url = "./menu/restaurant.csv";
    let response = await fetch(url);
    let data = await response.text();
    let parsedData = await parse(data)

    // console.log(parsedData)

    for(let i=1; i<parsedData.length; i++){
        let [iName, iIngr, iCost, iCateg, iGluten, iFreeze, iVeg] = parsedData[i]

        let item = {
            name: iName,
            ingredients : iIngr,
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

    // console.log(items)

    items.map(item => {
        let $divItem = $("<div>", {"class": "item"});


        $("<h3>", {"class": "title"}).html(item.name).appendTo($divItem)
        $("<div>", {"class": "ingr"}).html(item.ingredients).appendTo($divItem)
        let $divIcons = $("<div>", {"class": "icons"}).appendTo($divItem)
        $("<h3>", {"class": "cost"}).html(item.cost).appendTo($divItem)


        // icons
        if(item.isGlutenfree === "TRUE"){
            $("<img />", {
                src: icons.find(i => {return i.name === 'glutenfree'}).src,
                alt: icons.find(i => {return i.name === 'glutenfree'}).name
            }).appendTo($divIcons)
        }
        if(item.isFreezed === "TRUE"){
            $("<img />", {
                src: icons.find(i => {return i.name === 'freezed'}).src,
                alt: icons.find(i => {return i.name === 'freezed'}).name
            }).appendTo($divIcons)
        }
        if(item.isVegetarian === "TRUE"){
            $("<img />", {
                src: icons.find(i => {return i.name === 'vegetarian'}).src,
                alt: icons.find(i => {return i.name === 'vegetarian'}).name
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


let buildPage = async () => {
    await placeData()

    $("#accordion").accordion({
        icons: false,
        heightStyle: "content",
        active: false,
        collapsible: true
    });
}

buildPage()
