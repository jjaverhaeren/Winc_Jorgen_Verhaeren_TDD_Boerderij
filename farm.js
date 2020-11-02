// bereken de kosten voor een crop:get_costs_for_crop
// bereken inkomsten voor een crop (zonder omgevingsfactoren): get_revenue_for_crop
// bereken de winst voor een crop (zonder omgevingsfactoren): get_profit_for_crop
// bereken de winst voor meerdere crops (zonder omgevingsfactoren): get_total_profit
// neem omgevingsfactoren mee in het berekenen van de opbrengst (in kilo's) van een plant: get_yield_for_plant, gebruik daarvoor de volgende datastructuren:

// const corn = {
//     name: "corn",
//     yield: 30,
//     factors: {
//       sun: {
//         low: -50,
//         medium: 0,
//         high: 50,
//       },
//     },
//   };
  
//   const environment_factors = {
//     sun: "low",
//   };

//   doe deze berekening met meerdere omgevingsfactoren
// zorg dat je niet-relevante omgevingsfactoren negeert in je berekeningen
// bereken de opbrengst in kilo's van een crop get_yield_for_crop, neem omgevingsfactoren mee in je berekening
// bereken de winst van een crop get_profit_for_crop, neem omgevingsfactoren mee in je berekening
// bereken de winst voor meerdere crops get_total_profit, neem omgevingsfactoren mee in je berekening
const corn = {
  name: "corn",
  yield: 30,
  factors: {
    sun: {
      low: -50,
      medium: 0,
      high: 50,
    },
    wind: {
      low: 0,
      medium: -30,
      high: -60,
    }
  },
};

const pumpkin = {
  name: "pumpkin",
  yield: 30,
  factors: {
    sun: {
      low: -50,
      medium: 0,
      high: 50,
    },
    wind: {
      low: 0,
      medium: -30,
      high: -60,
    }
  },
};

const environment_factors = {
  sun: "low",
  wind: "medium",
};

const crop = { crop: corn, num_crops: 5, costs: 2, sales_price: 5 }
const {factors} = crop.crop;
const cornSunFactor = environment_factors.sun;
const cornSunEntries = Object.entries(corn.factors.sun);
const crops = [
  { crop: corn, num_crops: 5, costs: 2, sales_price: 5 },
  { crop: pumpkin, num_crops: 5, costs: 2, sales_price: 10 },
];



//
//


const get_yield_for_plant = (plant) => {
  return plant.yield
}

const get_yield_for_crop = (crop) => {
  let yieldOfCrop = crop.crop.yield
  let numOfCrops = crop.num_crops
  return yieldOfCrop*numOfCrops;
}

const get_total_yield = (crops) => {
  let totalYield = 0;
  crops.forEach(crop => {
  let totalPerPlant = crop.num_crops * crop.crop.yield;
  totalYield += totalPerPlant
  })
  return totalYield
 }

const get_costs_for_crop = (crop) => {
  return crop.num_crops * crop.costs
}

const get_revenue_for_crop = (crop) => {
  const cropYield = get_yield_for_crop(crop);
  return cropYield * crop.sales_price;
  
}

const get_profit_for_crop = (crop) => {
  const costs = get_costs_for_crop(crop);
  const revenue = get_revenue_for_crop(crop);
  return revenue-costs;
}

const get_total_profit = (crops) => {
  let totalProfit = 0;
  crops.forEach(crop => {
    profitPerCrop = get_profit_for_crop(crop);
    totalProfit += profitPerCrop
  })
  return totalProfit;
}


// const cornSunEntries = Object.entries(corn.factors.sun);
// const cornSunFactor = environment_factors.sun;

const get_factor = (cropEntries, elementFactor) => {

cropEntries.forEach(entry => {
if (entry[0] == elementFactor) {
factor = (entry[1])
}
})
return factor
}



const get_denominator = (factor) => {
if (factor === 0) {
    return 1
  }
else if (factor < 0) {
return factor / -100;
} else if (factor > 0) {
return (100 + factor) / 100
} 
}

const get_yield_for_plant_env = (crop, cropEntries, elementFactor) => {
  
  let factor = get_factor(cropEntries, elementFactor);
  let denominator = get_denominator(factor);
  let yieldForCrop = get_yield_for_crop(crop)
  return yieldForCrop * denominator;
}

const get_revenue_for_crop_env = (crop, cropEntries, elementFactor) => {
  const cropYieldEnv = get_yield_for_plant_env(crop, cropEntries, elementFactor);
  return cropYieldEnv * crop.sales_price;
}


const get_profit_for_crop_env = (crop, cropEntries, elementFactor) => {
  const costs = get_costs_for_crop(crop);
  const revenue = get_revenue_for_crop_env(crop, cropEntries, elementFactor);
  return revenue-costs;
}

const get_total_denominator = () => {
  const currentFactors = Object.entries(environment_factors);
  const factors_array = (Object.entries(factors))
  let all_options = new Array();
  factors_array.forEach(element => { 
    for (i = 0; i < currentFactors.length; i++) {
      if (element[0] === currentFactors[i][0]) {
        const optionsPerElement = Object.entries(element[1]);
        optionsPerElement.forEach(option => {
          if(option[0] == currentFactors[i][1]) {
            all_options[i] = (get_denominator(option[1]));
          }                    
        })       
      }
    }    
  })
  console.log(all_options.reduce((a,b) => a*b))
  return(all_options.reduce((a,b) => a*b)) 
}

const get_yield_for_crop_multiple_env = (crop) => {
  let yieldForCrop = get_yield_for_crop(crop);
  let totalDenominator = get_total_denominator();
  return yieldForCrop*totalDenominator;
}

const get_revenue_for_crop_multiple_env = (crop) => {
   const totalYieldForCrop = get_yield_for_crop_multiple_env(crop);
   const salesPrice = crop.sales_price;
   return totalYieldForCrop * salesPrice;
}

const get_profit_for_crop_multiple_env = (crop) => {
  const rev = get_revenue_for_crop_multiple_env(crop);
  const cost = get_costs_for_crop(crop);
  return rev - cost;

}

const get_Profit = (crops) => {
  let Profit = 0;
  crops.forEach(crop => {
    return profitPerCrop = get_profit_for_crop_multiple_env(crop)
  })
  return Profit += profitPerCrop;
}

const getProfit = (crops) => {
  let Profit = new Array();
  crops.forEach(crop => {
     profitPerCrop = get_profit_for_crop_multiple_env(crop);
     Profit.push(profitPerCrop)
  })
 return(Profit.reduce((a,b) => a+b)) 
}

module.exports = {
    get_yield_for_plant,
    get_yield_for_crop,
    get_total_yield,
    get_costs_for_crop,
    get_revenue_for_crop,
    get_profit_for_crop,
    get_total_profit,
    get_factor,
    get_denominator,
    get_yield_for_plant_env,
    get_revenue_for_crop_env,
    get_profit_for_crop_env,
    get_total_denominator,
    get_yield_for_crop_multiple_env,
    get_revenue_for_crop_multiple_env,
    get_profit_for_crop_multiple_env,
    getProfit,
}
