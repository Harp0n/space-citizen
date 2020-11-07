import Food from './Food.js'
import Nutritions from './Nutritions.js';
import FoodDatabase from './FoodDatabase.js';
import { shuffle, randomTime } from './Utils.js';

var DEBUG = true;


class FoodPlanner {
    constructor() {
        this.foodDatabase = new FoodDatabase();
        this.foodDatabase.init();
    }
    static calculateRMR(age, weight, height, gender) {
        switch (gender) {
            case 'male':
                return (10 * weight) + (6.25 * height) - (5 * age) + 5;
            case 'female':
                return (10 * weight) + (6.25 * height) - (5 * age) - 161
        }
    }

    static calculateDailyCalories(age, weight, height, gender, activity_factor = 1.4) {
        return this.calculateRMR(age, weight, height, gender) * activity_factor;
    }

    static calculateRequiredNutrition(age, weight, height, gender, activity_factor = 1.4) {
        var dailyCalories = this.calculateDailyCalories(age, weight, height, gender, activity_factor);
        var fluid = weight * activity_factor / 32.0 * 1000;
        var calories = dailyCalories;
        var proteins = Math.round(dailyCalories * 0.25) / 4.0;
        var carbs = Math.round(dailyCalories * 0.5) / 4.0;
        var fats = Math.round(dailyCalories * 0.25) / 9.0;
        return new Nutritions(fluid, calories, proteins, carbs, fats);
    }

    static calculateFoodRank(leftNutritions, food) {
        var nutritions = food.getNutritions();

        var leftCalories = Math.max(0, leftNutritions.getCalories());
        var leftProteins = Math.max(0, leftNutritions.getProteins());
        var leftCarbs = Math.max(0, leftNutritions.getCarbs());
        var leftFats = Math.max(0, leftNutritions.getFats());

        var neededSum = leftCalories + leftProteins + leftCarbs + leftFats;

        var caloriesFactor = nutritions.getCalories() * leftCalories / neededSum;
        var proteinsFactor = nutritions.getProteins() * leftProteins / neededSum;
        var carbsFactor = nutritions.getCarbs() * leftCarbs / neededSum;
        var fatsFactor = nutritions.getFats() * leftFats / neededSum;

        var priorityValue = caloriesFactor + proteinsFactor + carbsFactor + fatsFactor;

        var excessiveWater = Math.max(0, nutritions.getFluid() - Math.max(0, leftNutritions.getFluid()));
        var excessiveCalories = Math.max(0, nutritions.getCalories() - Math.max(0, leftNutritions.getCalories()));
        var excessiveProteins = Math.max(0, nutritions.getProteins() - Math.max(0, leftNutritions.getProteins()));
        var excessiveCarbs = Math.max(0, nutritions.getCarbs() - Math.max(0, leftNutritions.getCarbs()));
        var excessiveFats = Math.max(0, nutritions.getFats() - Math.max(0, leftNutritions.getFats()));
        var excessiveSum = excessiveCalories + excessiveFats + excessiveCarbs + excessiveProteins;
        return excessiveSum - priorityValue * 0.1;
    }

    generateDailyMenu(age, weight, height, gender, activity_factor = 1.4, n = 40) {
        var left_nutritions = this.constructor.calculateRequiredNutrition(age, weight, height, gender, activity_factor);
        if (DEBUG) console.log('Zapotrzebowanie: ', left_nutritions);
        var return_food = [];
        var food_array = this.foodDatabase.getFoodList();

        var iterations = 20;

        while (iterations > 0) {
            iterations--;
            food_array = shuffle(food_array);
            var foods = food_array.slice(0, n);
            var best_value = Infinity;
            var best_index = 0;
            for (var i = 0; i < n; i++) {
                var rank = this.constructor.calculateFoodRank(left_nutritions, foods[i]);
                if (rank < best_value) {
                    best_value = rank;
                    best_index = i;

                }
            }

            var selected_food = foods[best_index];
            return_food.push([randomTime(9, 21), selected_food]);

            left_nutritions.setFluid(left_nutritions.getFluid() - selected_food.getNutritions().getFluid());
            left_nutritions.setCalories(left_nutritions.getCalories() - selected_food.getNutritions().getCalories());
            left_nutritions.setProteins(left_nutritions.getProteins() - selected_food.getNutritions().getProteins());
            left_nutritions.setCarbs(left_nutritions.getCarbs() - selected_food.getNutritions().getCarbs());
            left_nutritions.setFats(left_nutritions.getFats() - selected_food.getNutritions().getFats());

            if (left_nutritions.getCalories() <= 0 && left_nutritions.getProteins() <= 0 &&
                left_nutritions.getCarbs() <= 0 && left_nutritions.getFats() <= 0)
                break;
        }

        var water = this.foodDatabase.getWater();
        while (left_nutritions.getFluid() > 0) {
            return_food.push([randomTime(8, 23), water]);
            left_nutritions.setFluid(left_nutritions.getFluid() - water.getNutritions().getFluid());
        }

        return_food.sort(function(a, b) {
            // compare hours first
            if (a[0].hours < b[0].hours) return -1;
            if (a[0].hours > b[0].hours) return 1;

            // else a.hour === b.hour, so compare minutes to break the tie
            if (a[0].minutes < b[0].minutes) return -1;
            if (a[0].minutes > b[0].minutes) return 1;

            // couldn't break the tie
            return 0;
        });


        if (DEBUG) console.log('Bilans: ', left_nutritions);
        return return_food;
    }
}


var foodPlanner = new FoodPlanner()

setTimeout(() => {
    var x = foodPlanner.generateDailyMenu(21, 67, 166, 'male');
    if (DEBUG) console.log('Lista zakupów: ', x);
}, 1000);