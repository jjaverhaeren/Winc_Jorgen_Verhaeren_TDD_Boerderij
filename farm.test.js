const {
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
  } = require("./farm");
  
  describe("get_yield_for_plant", () => {
    const corn = {
      name: "corn",
      yield: 30,
    };
  
    test("Get yield for plant with no environment factors", () => {
      expect(get_yield_for_plant(corn)).toBe(30);
    });
  });
  
  describe("get_yield_for_crop", () => {
    test("Get yield for crop, simple", () => {
      const corn = {
        name: "corn",
        yield: 3,
      };
      const crop = {
        crop: corn,
        num_crops: 10,
      };
      expect(get_yield_for_crop(crop)).toBe(30);
    });
  });
  
  describe("get_total_yield", () => {
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
        { crop: corn, num_crops: 5 },
        { crop: pumpkin, num_crops: 2 },
      ];
      expect(get_total_yield( crops )).toBe(23);
    });
  
    test("Calculate total yield with 0 amount", () => {
      const corn = {
        name: "corn",
        yield: 3,
      };
      const crops = [{ crop: corn, num_crops: 0 }];
      expect(get_total_yield(crops)).toBe(0);
    });
  });

  describe("get costs for crop", ()=> {
    test("get costs for crop", () => {
      const corn = {
        name: "corn",
        yield: 3,
      };
      const crop = { crop: corn, num_crops: 5, costs: 2 }
      ;
      expect(get_costs_for_crop(crop)).toBe(10)
    });
  });


  describe('get revenue for crop', () => {
    test('get revenue for crop', () => {
      const corn = {
        name: "corn",
        yield: 3,
      };
      const crop = 
        { crop: corn, num_crops: 5, costs: 2, sales_price: 5 };
      expect(get_revenue_for_crop(crop)).toBe(75)
    })
  })

  describe('get profit for crop', () => {
    test('get profit for single crop', () => {
      const corn = {
        name: "corn",
        yield: 3,
      };
      const crop = 
        { crop: corn, num_crops: 5, costs: 2, sales_price: 5 };
      expect(get_profit_for_crop(crop)).toBe(65)
    })
  })

  describe('get total profit for multiple crops', () => {
    test('get total profit', () => {
      const corn = {
        name: "corn",
        yield: 3,
      };
      const pumpkin = {
        name: "pumpkin",
        yield: 4,
      };
      const crops = [
        { crop: corn, num_crops: 5, costs: 2, sales_price: 5 },
        { crop: pumpkin, num_crops: 2, costs: 2, sales_price: 5 },
      ];
      expect(get_total_profit(crops)).toBe(101)
    })
  })

  describe('get yield for plant with environment factors', () => {
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

    const environment_factors = {
      sun: "low",
      wind: "medium",
    };
    
    const crop = { crop: corn, num_crops: 5, costs: 2, sales_price: 5 }
    const cornSunFactor = environment_factors.sun;
    const cornSunEntries = Object.entries(crop.crop.factors.sun);

    test('get environment factor', () => {
      expect(get_factor(cornSunEntries, cornSunFactor)).toBe(-50)
    })


    test('get denominator from negative factor', () => {
      const factor = -50;
      expect(get_denominator(factor)).toBe(0.5)
    })
    test('get denominator from positive factor', () => {
      const factor = 50;
      expect(get_denominator(factor)).toBe(1.5)
    })
    test('get denominator from 0 factor', () => {
      const factor = 0;
      expect(get_denominator(factor)).toBe(1)
    })

    test('get yield for plant with sun factor low', () => {
    
      expect(get_yield_for_plant_env(crop, cornSunEntries, cornSunFactor)).toBe(75)
    })

    // test('get yield for plant with sun factor high', () => {
    
    //   expect(get_yield_for_plant_env(crop, cornSunEntries, cornSunFactor)).toBe(225)
    // }) 

    // test('get yield for plant with sun factor medium', () => {
  
    //   expect(get_yield_for_plant_env(crop, cornSunEntries, cornSunFactor)).toBe(150)
    // })

  });

  //
  describe('get profit for crop with environment factors', () => {
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
  const crops = [
    { crop: corn, num_crops: 5, costs: 2, sales_price: 5 },
    { crop: pumpkin, num_crops: 5, costs: 2, sales_price: 10 },
  ];
  const {factors} = crop.crop;
    const cornSunFactor = environment_factors.sun;
    const cornSunEntries = Object.entries(corn.factors.sun);

    test('get revenue for crop with environment factor', () => {
      expect(get_revenue_for_crop_env(crop, cornSunEntries, cornSunFactor)).toBe(375)
    })

    test('get profit for crop with environment factor', () => {
      expect(get_profit_for_crop_env(crop, cornSunEntries, cornSunFactor)).toBe(365)
    })

    test('get total denominator for multiple environment factors', () => {
      expect(get_total_denominator()).toBe(0.15)
    })

    test('get yield per crop for multiple environment factors', () => {
      expect(get_yield_for_crop_multiple_env(crop)).toBe(22.5)
    })

    test('get revenue for crop with multiple environment factors', () => {
      expect(get_revenue_for_crop_multiple_env(crop)).toBe(112.5);
    })

    test('get profit for crop with multiple environment factors', () => {
      expect(get_profit_for_crop_multiple_env(crop)).toBe(102.5);
    })

    test('profit', () => {
      expect(getProfit(crops)).toBe(317.5)
    })
    
  })

  
  