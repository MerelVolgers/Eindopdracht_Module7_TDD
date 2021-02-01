const { test } = require("@jest/globals");
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
        expect(getRevenueForCrop(input)).toBe(60);
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
        expect(getProfitForCrop(input)).toBe(50);
    });
});

describe("getTotalProfit", () => {
    const corn = { 
        name: "corn",
        yield: 3,
        costs: 1,
        salesPrice: 2,
    };

    const pumpkin = {
        name: "pumpkin",
        yield: 4,
        costs: 2,
        salesPrice: 3,
    };

    // const avocado = {
    //     name: "avocado",
    //     yield: 2,
    //     costs: 3,
    //     salesPrice: 4,
    // }
    
    const crops = [
        { crop: corn, numCrops: 5},
        { crop: pumpkin, numCrops: 2},
        // { crop: avocado, numCrops: 2},
    ];

    test("getTotalProfit of corn and pumpkin", () => {
        expect(getTotalProfit({crops})).toBe(45);
    });
});





