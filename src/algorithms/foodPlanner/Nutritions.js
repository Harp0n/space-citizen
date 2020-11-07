export default class Nutritions {
    constructor(fluid, calories, proteins, carbs, fats) {
        this.fluid = parseFloat(fluid);
        this.calories = parseFloat(calories);
        this.proteins = parseFloat(proteins);
        this.carbs = parseFloat(carbs);
        this.fats = parseFloat(fats);
    }

    getFluid() {
        return this.fluid;
    }

    setFluid(val) {
        this.fluid = val;
    }

    getCalories() {
        return this.calories;
    }

    setCalories(val) {
        this.calories = val;
    }

    getProteins() {
        return this.proteins;
    }

    setProteins(val) {
        this.proteins = val;
    }

    getCarbs() {
        return this.carbs;
    }

    setCarbs(val) {
        this.carbs = val;
    }

    getFats() {
        return this.fats;
    }

    setFats(val) {
        this.fats = val;
    }
}