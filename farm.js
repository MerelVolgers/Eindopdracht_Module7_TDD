// get yield for 1 plant
const getYieldForPlant = (crop) => { 
    return crop.yield;
};

// get yield for entire crop (all plants of 1 type)
const getYieldForCrop = (input) => {
    return getYieldForPlant(input.crop) * input.numCrops;
};

// get total yield for multiple crops
const getTotalYield = ({crops}) => {
    let total = 0;
    crops.forEach(crop => {
        total += getYieldForCrop(crop)
    });
    return total;
};

// get costs for a single crop
const getCrop = (crop) => {
    return crop;
};

const getCostsForCrop = (input) => {
    const cropCosts = getCrop(input.crop).costs;
    return cropCosts * input.numCrops;
};

// get revenue for a single crop
const getRevenueForCrop = (input) => {
    return getYieldForCrop(input) * input.crop.salesPrice
};

// get profit for single crop
const getProfitForCrop = (input) => {
    return getRevenueForCrop(input) - getCostsForCrop(input);
};

// get profit for multiple crops
const getTotalProfit = ({crops}) => {
    let total = 0;
    crops.forEach(crop => {
        total += getProfitForCrop(crop)
    })
    return total;
};



module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
}