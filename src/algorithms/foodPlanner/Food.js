import Nutritions from './Nutritions.js'

export default class Food {
    constructor(name, type, fluid, calories, proteins, carbs, fats) {
        this.name = name;
        this.type = type;
        this.nutritions = new Nutritions(fluid, calories, proteins, carbs, fats);
    }

    getName() {
        return this.name
    }

    getType() {
        return this.type;
    }

    getNutritions() {
        return this.nutritions;
    }
}