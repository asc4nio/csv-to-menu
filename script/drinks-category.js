import { parse } from '../libs/vanillaes-csv/index.js'

// $(document).ready(function() {
// });

$.ajax({
    type: "GET",
    url: "./menu/drinks.csv",
    dataType: "text",
    success: data => processData(data)
});

function processData(data) {

    const parsed = parse(data)
    console.log(parsed);

    for (let i = 1; i < parsed.length; i++) {

        let $cItem = $("<div>", { "class": "item" });

        let $cTitle = $("<h2>", { "class": "title" });
        let $cIngr = $("<div>", { "class": "ingr" });
        let $cHistory = $("<div>", { "class": "history" });
        let $cCost = $("<div>", { "class": "cost" });
        // let $cCategory = $("<div>", { "class": "category" });

        let title = parsed[i][0]
        let ingr = parsed[i][1]
        let history = parsed[i][2]
        let cost = parsed[i][3]
        let category = parsed[i][4]

        console.log(category)

        let preDinnerCont = $('#predinner')
        let afterDinnerCont = $('#afterdinner')
        let longDrinkCont = $('#longdrink')

        switch (category) {
            case 'PRE DINNER':
                $cItem.appendTo(preDinnerCont);
                break;
            case 'AFTER DINNER':
                $cItem.appendTo(afterDinnerCont);
                break;
            case 'LONG DRINK':
                $cItem.appendTo(longDrinkCont);
                break;
            default:
                break;
        }

        // $cItem.appendTo(".drinks-container");

        $cTitle.html(title)
        $cTitle.appendTo($cItem);

        $cIngr.html(ingr)
        $cIngr.appendTo($cItem);

        $cHistory.html(history)
        $cHistory.appendTo($cItem);

        $cCost.html(cost)
        $cCost.appendTo($cItem);

    }

}