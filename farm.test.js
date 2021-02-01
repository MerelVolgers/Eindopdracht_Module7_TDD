const { 
    getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
} = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30, // totaal aantal kilo's opbrengst van 10 maisplanten
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3, // 3 kg opbrengst per maisplant (=standaard, zonder omgevingsfactoren)
        };
        const input = {
            crop: corn,
            numCrops: 10, // aantal plantjes 
        };
        expect(getYieldForCrop(input)).toBe(30); // kilogrammen totaal van 10 plantjes à 3kg mais per plant
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23); // Totale opbrengst in kg van meerdere plantjes
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];

        expect(getTotalYield({ crops })).toBe(0); // Totale opbrengst in kg van 0 plantjes
    });
});

describe("getCostsForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        costs: 1,
    }

    const input = {
        crop: corn,
        numCrops: 10,
    }

    test("Calculate costs for crop", () => {
        expect (getCostsForCrop(input)).toBe(10); // Totale kosten van 10 plantjes mais à €1 pstk
    })
});

describe("getRevenueForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        costs: 1,
        salesPrice: 2
    }

    const input = {
        crop: corn,
        numCrops: 10,
    }

    test("getRevenueForCrop", () => {
        expect(getRevenueForCrop(input)).toBe(60); // Totale inkomsten van 10 plantjes mais
    })
});

describe("getProfitForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        costs: 1,
        salesPrice:2,
    };

    const input = {
        crop: corn,
        numCrops: 10,
    };

    test("getProfitForCrop Corn", () => {
        expect(getProfitForCrop(input)).toBe(50); // Totale winst van 10 plantjes mais
    });
});

describe("getTotalProfit of crops", () => {
    const corn = { 
        name: "corn",
        yield: 3,
        costs: 1,
        salesPrice: 2,
    };

    const avocado = {
        name: "avocado",
        yield: 4,
        costs: 3,
        salesPrice: 5,
    };

    const pear = {
        name: "pear",
        yield: 5,
        costs: 2,
        salesPrice: 3,
    };
    
    const crops = [
        { crop: corn, numCrops: 5},
        { crop: avocado, numCrops: 2},
        { crop: pear, numCrops: 10},
    ];

    test("getTotalProfit of corn, avocado and pear", () => {
        expect(getTotalProfit({crops})).toBe(189); // Totale winst van mais, avocado en peer
    });
});


// 6. including environmental factors
// 7. with several environmental factors
// 8. only relevant environmental factors

describe("getYieldForPlant with environmental factors", () => {
    const avocado = {
        name: "avocado",
        yield: 4,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },

            wind: {
                low: 10,
                medium: -20,
                high: -30,
            },

            soil: {
                sandy: 0,
                clay: 0,
                silt: 40,
            }
        },
    };

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
                medium: 0,
                high: 0,
            },

            soil: {
                sandy: -20,
                clay: 0,
                silt: 40,
            },
        },
    };

    const environmentalFactors = {
        sun: "low",
        wind: "high",
        soil: "silt",
    };

    test("getYieldForAvocado with environmental factors",() => {
        expect(getYieldForPlant(avocado, environmentalFactors)).toBe(1.9599999999999997);
    });

    test("getYieldForCorn with environmental factors", () => {
        expect(getYieldForPlant(corn, environmentalFactors)).toBe(21);
    });

});

// get profit for crop with environmental factors

describe("getProfitForCrop with environmental factors", () => {
    const corn = {
        name: "corn",
        yield: 3,
        costs: 1,
        salesPrice:2,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },

            wind: {
                low: 0,
                medium: 0,
                high: 0,
            },

            soil: {
                sandy: -20,
                clay: 0,
                silt: 40,
            },
        },
    };

    const input = {
        crop: corn,
        numCrops: 10,
    };

    const environmentalFactors = {
        sun: "high",
        wind: "medium",
        soil: "silt",
    }

    test("getProfitForCrop with environmental factors Corn", () => {
        expect(getProfitForCrop(input, environmentalFactors)).toBe(116); 
    });

});

// get profit for multiple crops including environmental factors


describe("getTotalProfit of crops", () => {
    const corn = { 
        name: "corn",
        yield: 3,
        costs: 1,
        salesPrice: 2,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },

            wind: {
                low: 0,
                medium: 0,
                high: 0,
            },

            soil: {
                sandy: -20,
                clay: 0,
                silt: 40,
            },
        },
    };

    const avocado = {
        name: "avocado",
        yield: 4,
        costs: 3,
        salesPrice: 5,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },

            wind: {
                low: 10,
                medium: -20,
                high: -30,
            },

            soil: {
                sandy: 0,
                clay: 0,
                silt: 40,
            }
        },
    };

    const pear = {
        name: "pear",
        yield: 5,
        costs: 2,
        salesPrice: 3,
        factors: {
            sun: {
                low: -10,
                medium: 0,
                high: 40,
            },

            wind: {
                low: 10,
                medium: -20,
                high: -30,
            },

            soil: {
                sandy: 0,
                clay: 0,
                silt: 40,
            }
        },
    };
    
    const crops = [
        { crop: corn, numCrops: 5},
        { crop: avocado, numCrops: 2},
        { crop: pear, numCrops: 10},
    ];

    const environmentalFactors = {
        sun: "low",
        wind: "low",
        soil: "silt",
    }

    test("getTotalProfit of corn, avocado and pear with environmental factors", () => {
        expect(getTotalProfit({crops}, environmentalFactors)).toBe(228.7); 
    });
});




