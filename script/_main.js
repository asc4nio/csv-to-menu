import { parse } from '../libs/vanillaes-csv/index.js'

let drinks = []

let getNParseData = async () => {
    let url = "./menu/drinks.csv";
    let response = await fetch(url);
    let data = await response.text();
    let parsedData = await parse(data)

    for(let i=1; i<parsedData.length; i++){
        let [dName, dIngr, dHist, dCost, dCateg] = parsedData[i]

        let drink = {
            name: dName,
            ingredients : dIngr,
            history: dHist,
            cost: dCost,
            category: dCateg
        }

        drinks.push(drink)
    }
}

let placeData = async () => {
    await getNParseData()

    console.log(drinks)

    drinks.map(item => {
        let $divItem = $("<div>", {"class": "item"});

        $("<h2>", {"class": "title"}).html(item.name).appendTo($divItem)
        $("<div>", {"class": "category"}).html(item.category).appendTo($divItem)
        $("<div>", {"class": "ingr"}).html(item.ingredients).appendTo($divItem)
        $("<div>", {"class": "history"}).html(item.history).appendTo($divItem)
        $("<div>", {"class": "cost"}).html(item.cost).appendTo($divItem)

        $divItem.appendTo( ".drinks-container" );
    })

}

placeData()