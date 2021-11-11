import { Test } from "@nestjs/testing";
import { Connection } from "mongoose";
import { AppModule } from "../../app.module";
import { DatabaseService } from "../../database/database.service";
import * as request from "supertest";
import { userStub } from "./stubs/user.stub";

describe("UsersService", () => {
  let db: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    db = module.get<DatabaseService>(DatabaseService).getDbHandler();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("registerUser", () => {
    it("should register a new user", async () => {
      const response = await request(httpServer)
        .post("/users/register")
        .send(userStub());
      expect(response.status).toBe(201);      
      await db.collection('users').deleteOne({ email: response.body.data.email });
    });

    it("should throw error when registering with existing email", async () => {
      await db.collection('users').insertOne(userStub());
      const response = await request(httpServer)
        .post("/users/register")
        .send(userStub());
      expect(response.status).toBe(400);
      await db.collection('users').deleteOne({ email: userStub().email });
    });
  });

  describe('loginUser', () => {
    it('should login a user and get token', async () => {
      let response = await request(httpServer)
        .post("/users/register")
        .send(userStub());
      expect(response.status).toBe(201);

      response = await request(httpServer)
        .post("/users/login")
        .send(userStub());
      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty('accessToken');
      await db.collection('users').deleteOne({ email: userStub().email });
    })
  })
});
