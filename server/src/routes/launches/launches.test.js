const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Test launches API", () => {

  beforeAll (async()=>{
    await mongoConnect();
  })

  afterAll (async()=>{
    await mongoDisconnect();
  })
  describe("Test Get /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/api/v1/showLa_unches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /launches", () => {
    const lauchData = {
      "launchDate":"December 30 2023",
      "target":"Kepler-62 f",
      "mission":"Kelpler Exploration X",
      "rocket":"Explorer IS1"
      
    };
    const resultLaunchData = [
      {
        flightNumber: 100,
        mission: "Kepler Exploration X",
        rocket: "Explorer IS1",
        launchDate: "2030-12-26T18:30:00.000Z",
        target: "Kepler-422 b",
        customer: ["ZTM", "NASA"],
        upcoming: true,
        success: true,
      },
      {
        mission: "ZTM155",
        rocket: "ZTM experimental IS1",
        target: "Kepler-186 f",
        launchDate: "2030-01-16T18:30:00.000Z",
        flightNumber: 101,
        customer: ["ZTM", "NASA"],
        upcoming: true,
        success: true,
      },
    ];
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .post("/api/v1/showLa_unches/add-launch")
        .send(lauchData)
        .expect(201);

      
    });
  });
});
