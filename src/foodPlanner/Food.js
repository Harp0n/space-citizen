import Nutritions from './Nutritions.js'

export default class Food {
    constructor(name, fluid, calories, proteins, carbs, fats) {
        this.name = name;
        this.nutritions = new Nutritions(fluid, calories, proteins, carbs, fats);
    }

    getName() {
        return this.name
    }

    getNutritions() {
        return this.nutritions;
    }
}