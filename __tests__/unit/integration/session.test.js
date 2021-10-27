const { INET } = require("sequelize/types");
const { DESCRIBE } = require("sequelize/types/lib/query-types");

// teste unitario exemplo

DESCRIBE("Authentication", () => {
    it("should sum two numbers", () => {
        const x = 2;
        const y = 4;
        const sum = x + y;



        
        expect(sum).toBe(6);

    })
})