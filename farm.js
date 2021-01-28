// get yield for 1 plant
const getYieldForPlant = (crop) => { 
    return crop.yield;
};

// get yield for entire crop (all plants of 1 type)
const getYieldForCrop = (input) => {
    return getYieldForPlant(input.crop) * input.numCrops;
};

// get total yield for several crops
const getTotalYield = ({crops}) => {
    let total = 0;
    crops.forEach(crop => {
        total += getYieldForCrop(crop)
    });
    return total;
};


module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield
}