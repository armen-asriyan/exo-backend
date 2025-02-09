// Import supertest for API testing
import request from "supertest";

// Import mongoose
import mongoose from "mongoose";

// Import the user model
import User from "../src/models/User.js";

// Import the Express app
import app from "../app.js";

// Import the user routes
import userRoutes from "../src/routes/userRoutes.js";

// Import the database connection
import connectDB from "../src/config/db.js";

// User Login API tests
describe("User Login API", () => {
  // Variable to store the test user ID
  let userId;

  // Connect to the database before each test and delete the user made for this test
  beforeAll(async () => {
    await connectDB();
    await User.deleteOne({ email: "jester@example.com" });

    app.use("/api/users", userRoutes);
  });

  // Close the database connection after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test the register route (also store the user ID in the userId variable)
  it("Should register a new user", async () => {
    const response = await request(app).post("/api/users/register").send({
      name: "Jester",
      email: "jester@example.com",
      password: "Password123",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("message", "Utilisateur enregistré");

    // Store the user ID in the userId variable
    userId = await response.body.user?._id;
  });

  // Test the register route with missing fields
  it("Should not register a new user with missing fields (400)", async () => {
    const response = await request(app).post("/api/users/register").send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Tous les champs sont obligatoires"
    );
  });

  // Test the register route with existing email
  it("Should not register a new user with existing email (400)", async () => {
    const response = await request(app).post("/api/users/register").send({
      name: "Jester",
      email: "jester@example.com",
      password: "Password123",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Utilisateur existant");
  });

  // Test the login route
  it("Should login a user and return a token", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "jester@example.com", password: "Password123" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  // Test the login route with invalid email
  it("Should not login a user with invalid email (401)", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "jester@example_INVALID.com", password: "Password123" });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message", "Identifiants incorrects");
  });

  // Test the login route with invalid password
  it("Should not login a user with invalid password (401)", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "jester@example.com", password: "WRONGPASSWORD" });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message", "Identifiants incorrects");
  });

  // Test the login route with missing fields
  it("Should not login a user with missing fields (400)", async () => {
    const response = await request(app).post("/api/users/login").send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Tous les champs sont obligatoires"
    );
  });

  // Test the update route
  it("Should update a user", async () => {
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send({ name: "Jester Updated", password: "Password123" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Utilisateur mis à jour");
  });

  // Test the update route with missing fields
  it("Should not update a user with missing fields (400)", async () => {
    const response = await request(app).put(`/api/users/${userId}`).send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Tous les champs sont obligatoires"
    );
  });

  // Test the update route with ID missing
  it("Should not update a user if ID is missing (400)", async () => {
    const response = await request(app)
      .put(`/api/users/`)
      .send({ name: "Jester Updated" });

    expect(response.statusCode).toBe(400);

    expect(response.body).toHaveProperty("message", "ID utilisateur manquant");

    expect(response.body).toHaveProperty("code", "MISSING_ID");
  });

  // Test the update route with invalid ID
  it("Should not update a user with invalid ID (400)", async () => {
    const response = await request(app).put(`/api/users/123456789`).send({});

    expect(response.statusCode).toBe(400);

    expect(response.body).toHaveProperty(
      "message",
      "ID utilisateur manquant/invalide"
    );
    expect(response.body).toHaveProperty("code", "INVALID_ID");
  });

  // Test the delete route
  it("Should delete a user", async () => {
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Utilisateur supprimé");
  });

  // Test the delete route with ID missing
  it("Should not delete a user if ID is missing (400)", async () => {
    const response = await request(app).delete(`/api/users/`);

    expect(response.statusCode).toBe(400);

    expect(response.body).toHaveProperty("message", "ID utilisateur manquant");
    expect(response.body).toHaveProperty("code", "MISSING_ID");
  });

  // Test the delete route with invalid ID
  it("Should not delete a user with invalid ID (400)", async () => {
    const response = await request(app).delete(`/api/users/123456789`);

    expect(response.statusCode).toBe(400);

    expect(response.body).toHaveProperty(
      "message",
      "ID utilisateur manquant/invalide"
    );
    expect(response.body).toHaveProperty("code", "INVALID_ID");
  });
});
