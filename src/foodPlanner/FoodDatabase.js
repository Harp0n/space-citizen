import Food from './Food.js'

async function csvJSON(path) {
    return fetch(path).then(response => response.text()).then(csv => {
        var lines = csv.split("\n");

        var result = [];

        var headers = lines[0].split(",");
        headers[headers.length - 1] = headers[headers.length - 1].replace('\r', '');

        for (var i = 1; i < lines.length; i++) {

            var obj = {};
            var currentline = lines[i].split(",");

            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);

        }
        return result; //JavaScript object
        //return JSON.stringify(result); //JSON
    });
}

export default class FoodDatabase {
    constructor() {
        //add connection to database
    }

    async init() {
        let foodJson = await csvJSON('food_edited.csv');
        this.foodArray = [];
        foodJson.forEach(element => {
            this.foodArray.push(new Food(element['name'], element['water'], element['calories'], element['protein'], element['carbohydrate'], element['fat']));
        });

        this.foodArray.pop();
        this.water = new Food('portion of water', 237, 0, 0, 0, 0);
    }

    getFoodList() {
        //(name, fluid, calories, proteins, carbs, fat)
        // return [
        //     new Food('scrambled eggs', 141, 273, 18.3, 2.9, 20.1),
        //     new Food('portion of water', 237, 0, 0, 0, 0),
        //     new Food('crackers', 237, 0, 0, 0, 0),
        // ];
        return this.foodArray;
    }

    getWater() {
        return this.water;
    }

    addFood(food) {
        throw 'NotImplementedError';
    }

    removeFood(name) {
        throw 'Parameter is not a number!';
    }

}