import request from "supertest";
import { app } from "../../server";

import {
  IFoodItemDTO,
  IFoodItemEditDTO,
} from "../../../../shared/models/foodItem.model";
import { IAuthSignUpDTO } from "../../../../shared/models/auth.model";

describe("Food Items API", () => {
  const testFoodItems: IFoodItemDTO[] = [];
  let authToken: string;
  let testUserId: string;

  beforeAll(async () => {
    const userCredentials: IAuthSignUpDTO = {
      email: `test-foodItem-user-${Date.now()}@example.com`,
      password: "Password123!",
      confirmPassword: "Password123!",
      firstName: "foodItem",
      lastName: "Tester",
    };
    const userRes = await request(app)
      .post("/api/v1/auth/sign-up")
      .send(userCredentials);
    testUserId = userRes.body.data.id;
    authToken = userRes.headers["set-cookie"][0].split(";")[0].split("=")[1];
  });

  describe("POST /api/v1/food-items/edit", () => {
    it("should create a new food item successfully", async () => {
      const newFoodItem: IFoodItemEditDTO = {
        name: "Testable Food Item",
        barcode: `12345${Date.now()}`.slice(0, 13),
        calories: 200,
        proteins: 20,
        carbohydrates: 30,
        fat: 10,
        fiber: 5,
        sugars: 15,
        salt: 0.5,
        cholesterol: 30,
        saturatedFat: 3,
        ownerId: testUserId,
        brand: [{ name: "Test Brand", crudOperation: "create" }],
        categories: [{ name: "Test Category", crudOperation: "create" }],
        labels: [{ name: "Test Label", crudOperation: "create" }],
        images: [
          {
            url: "http://example.com/image.jpg",
            altText: "Example Image",
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/food-items/edit")
        .set("Cookie", `token=${authToken}`)
        .send(newFoodItem);

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("FoodItem created successfully");
      const foodItem: IFoodItemDTO = res.body.data;
      testFoodItems.push(foodItem);

      expect(foodItem).toHaveProperty("id");

      expect(foodItem.name).toBe(newFoodItem.name?.toLowerCase());
      expect(foodItem.calories).toBe(newFoodItem.calories);
      expect(foodItem.proteins).toBe(newFoodItem.proteins);
      expect(foodItem.carbohydrates).toBe(newFoodItem.carbohydrates);
      expect(foodItem.fat).toBe(newFoodItem.fat);
      expect(foodItem.fiber).toBe(newFoodItem.fiber);
      expect(foodItem.sugars).toBe(newFoodItem.sugars);
      expect(foodItem.salt).toBe(newFoodItem.salt);
      expect(foodItem.cholesterol).toBe(newFoodItem.cholesterol);
      expect(foodItem.saturatedFat).toBe(newFoodItem.saturatedFat);

      expect(foodItem.barcode).toBe(newFoodItem.barcode);

      expect(foodItem.brand?.name).toBe("test brand");
      expect(foodItem.categories[0].name).toBe("test category");
      expect(foodItem.labels![0].name).toBe("test label");
      expect(foodItem.images![0].url).toBe("http://example.com/image.jpg");
      expect(foodItem.images![0].altText).toBe("example image");
    });

    it("should reject food item with multiple missing required fields", async () => {
      const incompleteFoodItem = {
        ownerId: testUserId,
      };

      const res = await request(app)
        .post("/api/v1/food-items/edit")
        .set("Cookie", `token=${authToken}`)
        .send(incompleteFoodItem);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");

      const errors = res.body.errors;
      expect(errors.name).toBe("Food name is required.");
      expect(errors.barcode).toBe("Food barcode is required.");
    });

    it("should sanitize HTML tags from name", async () => {
      const foodWithHtml: IFoodItemEditDTO = {
        name: "<script>alert('xss')</script>Malicious <b>Food</b>",
        barcode: `555${Date.now()}`.slice(0, 13),
        calories: 100,
        ownerId: testUserId,
      };

      const res = await request(app)
        .post("/api/v1/food-items/edit")
        .set("Cookie", `token=${authToken}`)

        .send(foodWithHtml);

      expect(res.status).toBe(201);
      const foodItem: IFoodItemDTO = res.body.data;
      testFoodItems.push(foodItem);
      expect(foodItem.name).toBe("malicious food");
    });

    it("should handle multiple whitespace characters in name", async () => {
      const foodWithWhitespace: IFoodItemEditDTO = {
        name: "   Spaced    Out     Food   ",
        barcode: `666${Date.now()}`.slice(0, 13),
        calories: 100,
        ownerId: testUserId,
      };

      const res = await request(app)
        .post("/api/v1/food-items/edit")
        .set("Cookie", `token=${authToken}`)

        .send(foodWithWhitespace);

      expect(res.status).toBe(201);
      const foodItem: IFoodItemDTO = res.body.data;
      testFoodItems.push(foodItem);
      expect(foodItem.name).toBe("spaced out food");
    });

    it("should reject if name becomes empty after sanitization", async () => {
      const foodWithOnlyHtml: IFoodItemEditDTO = {
        name: "<script></script><i></i>",
        barcode: `777${Date.now()}`.slice(0, 13),
        calories: 100,
        ownerId: testUserId,
      };

      const res = await request(app)
        .post("/api/v1/food-items/edit")
        .set("Cookie", `token=${authToken}`)

        .send(foodWithOnlyHtml);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.body.message).toBe("Validation failed");
      expect(res.body.errors.name).toBeDefined();
      expect(res.body.errors.name).toContain(
        "Food name must be at least 1 characters long"
      );
    });
  });

  describe("GET /api/v1/food-items", () => {
    beforeAll(async () => {
      const foodItems: IFoodItemEditDTO[] = [
        {
          name: "Test Food 1",
          barcode: "1234567890121",
          ownerId: testUserId,

          calories: 100,
          proteins: 10,
          carbohydrates: 20,
          fat: 5,
          fiber: 2,
          sugars: 10,
          salt: 0.1,
          cholesterol: 10,
          saturatedFat: 1,
          brand: [{ name: "Brand 1", crudOperation: "create" }],
          categories: [{ name: "Category 1", crudOperation: "create" }],
        },
        {
          name: "Test Food 2",
          barcode: "1234567890122",
          ownerId: testUserId,

          calories: 150,
          proteins: 15,
          carbohydrates: 25,
          fat: 7,
          fiber: 3,
          sugars: 12,
          salt: 0.2,
          cholesterol: 15,
          saturatedFat: 2,
          brand: [{ name: "Brand 2", crudOperation: "create" }],
          categories: [{ name: "Category 2", crudOperation: "create" }],
        },
        {
          name: "Test Food 3",
          barcode: "1234567890123",
          ownerId: testUserId,

          calories: 200,
          proteins: 20,
          carbohydrates: 30,
          fat: 10,
          fiber: 5,
          sugars: 15,
          salt: 0.5,
          cholesterol: 30,
          saturatedFat: 3,
          brand: [{ name: "Brand 3", crudOperation: "create" }],
          categories: [{ name: "Category 3", crudOperation: "create" }],
        },
        {
          name: "Test Food 4",
          barcode: "1234567890124",
          ownerId: testUserId,

          calories: 250,
          proteins: 25,
          carbohydrates: 35,
          fat: 12,
          fiber: 6,
          sugars: 18,
          salt: 0.7,
          cholesterol: 35,
          saturatedFat: 4,
          brand: [{ name: "Brand 4", crudOperation: "create" }],
          categories: [{ name: "Category 4", crudOperation: "create" }],
        },
        {
          name: "Test Food 5",
          barcode: "1234567890125",
          ownerId: testUserId,

          calories: 300,
          proteins: 30,
          carbohydrates: 40,
          fat: 15,
          fiber: 7,
          sugars: 20,
          salt: 1.0,
          cholesterol: 40,
          saturatedFat: 5,
          brand: [{ name: "Brand 5", crudOperation: "create" }],
          categories: [{ name: "Category 5", crudOperation: "create" }],
        },
        {
          name: "Test Food 6",
          barcode: "1234567890126",
          ownerId: testUserId,

          calories: 350,
          proteins: 35,
          carbohydrates: 45,
          fat: 17,
          fiber: 8,
          sugars: 22,
          salt: 1.2,
          cholesterol: 45,
          saturatedFat: 6,
          brand: [{ name: "Brand 6", crudOperation: "create" }],
          categories: [{ name: "Category 6", crudOperation: "create" }],
        },
        {
          name: "Test Food 7",
          barcode: "1234567890127",
          ownerId: testUserId,

          calories: 400,
          proteins: 40,
          carbohydrates: 50,
          fat: 20,
          fiber: 9,
          sugars: 25,
          salt: 1.5,
          cholesterol: 50,
          saturatedFat: 7,
          brand: [{ name: "Brand 7", crudOperation: "create" }],
          categories: [{ name: "Category 7", crudOperation: "create" }],
        },
        {
          name: "Test Food 8",
          barcode: "1234567890128",
          ownerId: testUserId,

          calories: 450,
          proteins: 45,
          carbohydrates: 55,
          fat: 22,
          fiber: 10,
          sugars: 27,
          salt: 1.7,
          cholesterol: 55,
          saturatedFat: 8,
          brand: [{ name: "Brand 8", crudOperation: "create" }],
          categories: [{ name: "Category 8", crudOperation: "create" }],
        },
        {
          name: "Test Food 9",
          barcode: "1234567890129",
          ownerId: testUserId,

          calories: 500,
          proteins: 50,
          carbohydrates: 60,
          fat: 25,
          fiber: 11,
          sugars: 30,
          salt: 2.0,
          cholesterol: 60,
          saturatedFat: 9,
          brand: [{ name: "Brand 9", crudOperation: "create" }],
          categories: [{ name: "Category 9", crudOperation: "create" }],
        },
        {
          name: "Test Food 10",
          barcode: "1234567890130",
          ownerId: testUserId,

          calories: 550,
          proteins: 55,
          carbohydrates: 65,
          fat: 27,
          fiber: 12,
          sugars: 32,
          salt: 2.2,
          cholesterol: 65,
          saturatedFat: 10,
          brand: [{ name: "Brand 10", crudOperation: "create" }],
          categories: [{ name: "Category 10", crudOperation: "create" }],
        },
        {
          name: "Test Food 11",
          barcode: "1234567890131",
          ownerId: testUserId,

          calories: 600,
          proteins: 60,
          carbohydrates: 70,
          fat: 30,
          fiber: 13,
          sugars: 35,
          salt: 2.5,
          cholesterol: 70,
          saturatedFat: 11,
          brand: [{ name: "Brand 11", crudOperation: "create" }],
          categories: [{ name: "Category 11", crudOperation: "create" }],
        },
        {
          name: "Test Food 12",
          barcode: "1234567890132",
          ownerId: testUserId,

          calories: 650,
          proteins: 65,
          carbohydrates: 75,
          fat: 32,
          fiber: 14,
          sugars: 37,
          salt: 2.7,
          cholesterol: 75,
          saturatedFat: 12,
          brand: [{ name: "Brand 12", crudOperation: "create" }],
          categories: [{ name: "Category 12", crudOperation: "create" }],
        },
        {
          name: "Test Food 13",
          barcode: "1234567890133",
          ownerId: testUserId,

          calories: 700,
          proteins: 70,
          carbohydrates: 80,
          fat: 35,
          fiber: 15,
          sugars: 40,
          salt: 3.0,
          cholesterol: 80,
          saturatedFat: 13,
          brand: [{ name: "Brand 13", crudOperation: "create" }],
          categories: [{ name: "Category 13", crudOperation: "create" }],
        },
        {
          name: "Test Food 14",
          barcode: "1234567890134",
          ownerId: testUserId,

          calories: 750,
          proteins: 75,
          carbohydrates: 85,
          fat: 37,
          fiber: 16,
          sugars: 42,
          salt: 3.2,
          cholesterol: 85,
          saturatedFat: 14,
          brand: [{ name: "Brand 14", crudOperation: "create" }],
          categories: [{ name: "Category 14", crudOperation: "create" }],
        },
        {
          name: "Test Food 15",
          barcode: "1234567890135",
          ownerId: testUserId,

          calories: 800,
          proteins: 80,
          carbohydrates: 90,
          fat: 40,
          fiber: 17,
          sugars: 45,
          salt: 3.5,
          cholesterol: 90,
          saturatedFat: 15,
          brand: [{ name: "Brand 15", crudOperation: "create" }],
          categories: [{ name: "Category 15", crudOperation: "create" }],
        },
        {
          name: "Test Food 16",
          barcode: "1234567890136",
          ownerId: testUserId,

          calories: 850,
          proteins: 85,
          carbohydrates: 95,
          fat: 42,
          fiber: 18,
          sugars: 47,
          salt: 3.7,
          cholesterol: 95,
          saturatedFat: 16,
          brand: [{ name: "Brand 16", crudOperation: "create" }],
          categories: [{ name: "Category 16", crudOperation: "create" }],
        },
        {
          name: "Test Food 17",
          barcode: "1234567890137",
          ownerId: testUserId,

          calories: 900,
          proteins: 90,
          carbohydrates: 100,
          fat: 45,
          fiber: 19,
          sugars: 50,
          salt: 4.0,
          cholesterol: 100,
          saturatedFat: 17,
          brand: [{ name: "Brand 17", crudOperation: "create" }],
          categories: [{ name: "Category 17", crudOperation: "create" }],
        },
        {
          name: "Test Food 18",
          barcode: "1234567890138",
          ownerId: testUserId,

          calories: 950,
          proteins: 95,
          carbohydrates: 105,
          fat: 47,
          fiber: 20,
          sugars: 52,
          salt: 4.2,
          cholesterol: 105,
          saturatedFat: 18,
          brand: [{ name: "Brand 18", crudOperation: "create" }],
          categories: [{ name: "Category 18", crudOperation: "create" }],
        },
        {
          name: "Test Food 19",
          barcode: "1234567890139",
          ownerId: testUserId,

          calories: 1000,
          proteins: 100,
          carbohydrates: 110,
          fat: 50,
          fiber: 21,
          sugars: 55,
          salt: 4.5,
          cholesterol: 110,
          saturatedFat: 19,
          brand: [{ name: "Brand 19", crudOperation: "create" }],
          categories: [{ name: "Category 19", crudOperation: "create" }],
        },
        {
          name: "Test Food 20",
          barcode: "1234567890140",
          ownerId: testUserId,

          calories: 1050,
          proteins: 105,
          carbohydrates: 115,
          fat: 52,
          fiber: 22,
          sugars: 57,
          salt: 4.7,
          cholesterol: 115,
          saturatedFat: 20,
          brand: [{ name: "Brand 20", crudOperation: "create" }],
          categories: [{ name: "Category 20", crudOperation: "create" }],
        },
      ];

      for (const foodItem of foodItems) {
        const res = await request(app)
          .post("/api/v1/food-items/edit")
          .set("Cookie", `token=${authToken}`)

          .send(foodItem);
        const created: IFoodItemDTO = res.body.data;
        testFoodItems.push(created);
      }
    });

    it("should return all food items", async () => {
      const res = await request(app).get("/api/v1/food-items");
      const foodItems: IFoodItemDTO[] = res.body.data;
      expect(res.status).toBe(200);
      expect(Array.isArray(foodItems)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);

      expect(foodItems).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: testFoodItems[0].id }),
        ])
      );
    });

    it("should filter food items by name (case-insensitive)", async () => {
      const targetName = "test";
      const res = await request(app).get(
        `/api/v1/food-items?name=${targetName.toLowerCase()}`
      );
      expect(res.status).toBe(200);
      expect(res.body.data[0].name).toContain(targetName);
    });
  });

  describe("GET /api/v1/food-items/:id", () => {
    it("should get a single food item by its ID", async () => {
      const foodItemId = testFoodItems[0].id;
      const res = await request(app).get(`/api/v1/food-items/${foodItemId}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(foodItemId);
    });

    it("should return 404 for a non-existent food item ID", async () => {
      const res = await request(app).get(
        "/api/v1/food-items/clxxxxxxxxxxxxxxxxxxxxxx"
      );
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/v1/food-items/edit/:id", () => {
    let foodItem: IFoodItemDTO;

    beforeEach(async () => {
      const baseFoodItem = {
        name: "Food To Update",
        barcode: `1232131${Date.now()}`.slice(0, 13),
        calories: 200,
        ownerId: testUserId,
        proteins: 20,
        carbohydrates: 30,
        fat: 10,
        fiber: 5,
        sugars: 15,
        salt: 0.5,
        cholesterol: 30,
        saturatedFat: 3,
        brand: [{ name: "Test Brand", crudOperation: "create" }],
        categories: [{ name: "Test Category", crudOperation: "create" }],
        labels: [{ name: "Test Label", crudOperation: "create" }],
        images: [
          {
            url: "http://example.com/image.jpg",
            altText: "Example Image",
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/food-items/edit")
        .set("Cookie", `token=${authToken}`)
        .send(baseFoodItem);

      foodItem = res.body.data;
    });

    afterEach(async () => {
      if (!foodItem) return;
      await request(app)
        .delete(`/api/v1/food-items/${foodItem.id}`)
        .set("Cookie", `token=${authToken}`);
    });

    it("should update multiple fields at once", async () => {
      const updateData: IFoodItemEditDTO = {
        name: "Completely Updated Food",
        barcode: "9999999999999999999999",
        calories: 999,
        proteins: 999,
        carbohydrates: 999,
        fat: 999,
        fiber: 999,
        sugars: 999,
        salt: 999,
        cholesterol: 999,
        saturatedFat: 999,
        ownerId: testUserId,

        categories: [
          { name: foodItem.categories[0].name, crudOperation: "delete" },
          { name: "Updated Category", crudOperation: "create" },
        ],
        brand: [
          { name: foodItem.brand?.name, crudOperation: "delete" },
          { name: "Updated Brand", crudOperation: "create" },
        ],
        labels: [
          { name: foodItem?.labels?.[0]?.name, crudOperation: "delete" },
          { name: "Updated Label", crudOperation: "create" },
        ],
        images: [
          {
            url: "http://example.com/image.jpg",
            altText: "Example Image",
            crudOperation: "delete",
          },
          {
            url: "http://example.com/updateImage.jpg",
            altText: "Update Example Image",
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .put(`/api/v1/food-items/edit/${foodItem.id}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      const item: IFoodItemDTO = res.body.data;
      expect(item.name).toBe("completely updated food");

      expect(item.barcode).toBe("9999999999999999999999");

      expect(item.calories).toBe(999);
      expect(item.proteins).toBe(999);
      expect(item.carbohydrates).toBe(999);
      expect(item.fat).toBe(999);
      expect(item.fiber).toBe(999);
      expect(item.sugars).toBe(999);
      expect(item.salt).toBe(999);
      expect(item.cholesterol).toBe(999);
      expect(item.saturatedFat).toBe(999);

      expect(item.brand?.name).toBe("updated brand");

      expect(item.categories.length).toBe(1);
      expect(item.categories[0].name).toBe("updated category");

      expect(item?.labels?.length).toBe(1);
      expect(item?.labels?.[0]?.name).toBe("updated label");
    });

    it("should sanitize HTML in updated name", async () => {
      const updateData: Partial<IFoodItemEditDTO> = {
        name: "<p>Updated <b>Food</b></p>",
        ownerId: testUserId,
      };

      const res = await request(app)
        .put(`/api/v1/food-items/edit/${foodItem.id}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("updated food");
    });

    it("should reject update if name becomes empty after sanitization", async () => {
      const updateData: Partial<IFoodItemEditDTO> = {
        name: "<em></em>",
      };

      const res = await request(app)
        .put(`/api/v1/food-items/edit/${foodItem.id}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Validation failed");
      expect(res.body.errors.name).toBe(
        "Food name must be at least 1 characters long"
      );
    });
  });

  describe("DELETE /api/v1/food-items/:id", () => {
    it("should delete an existing food item", async () => {
      const newFoodItem: IFoodItemEditDTO = {
        name: "delete Food Item",
        barcode: `211${Date.now()}`.slice(0, 13),
        calories: 200,
        proteins: 20,
        carbohydrates: 30,
        fat: 10,
        fiber: 5,
        sugars: 15,
        ownerId: testUserId,

        salt: 0.5,
        cholesterol: 30,
        saturatedFat: 3,
        brand: [{ name: "Test Brand", crudOperation: "create" }],
        categories: [{ name: "Test Category", crudOperation: "create" }],
        labels: [{ name: "Test Label", crudOperation: "create" }],
        images: [
          {
            url: "http://example.com/image.jpg",
            altText: "Example Image",
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/food-items/edit")
        .set("Cookie", `token=${authToken}`)
        .send(newFoodItem);

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("FoodItem created successfully");
      const foodItem: IFoodItemDTO = res.body.data;
      testFoodItems.push(foodItem);

      const deleteRes = await request(app)
        .delete(`/api/v1/food-items/${foodItem.id}`)
        .set("Cookie", `token=${authToken}`);
      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.message).toBe("FoodItem deleted successfully");

      const getRes = await request(app).get(
        `/api/v1/food-items/${foodItem.id}`
      );
      expect(getRes.status).toBe(404);
    });

    it("should return 400 for deleting a non-existent food item", async () => {
      const res = await request(app)
        .delete("/api/v1/food-items/clxxxxxxxxxxxxxxxxxxxxxx")
        .set("Cookie", `token=${authToken}`);
      expect(res.status).toBe(400);
    });
  });

  afterAll(async () => {
    for (const { id } of testFoodItems) {
      if (!id) continue;
      await request(app)
        .delete(`/api/v1/food-items/${id}`)
        .set("Cookie", `token=${authToken}`)
        .catch(() => {});
    }
    if (testUserId) {
      await request(app)
        .delete(`/api/v1/auth/delete-user/${testUserId}`)
        .set("Cookie", `token=${authToken}`)
        .catch((err) => {
          console.error(err);
        });
    }
  });
});
