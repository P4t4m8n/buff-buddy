import request from "supertest";
import { app } from "../../server";
import { IAuthSignUpDTO } from "../../../../shared/models/auth.model";
import {
  IFoodItemEditDTO,
  IFoodItemDTO,
} from "../../../../shared/models/foodItem.model";
import { IMealDTO, IMealEditDTO } from "../../../../shared/models/meal.model";
describe("Meals API", () => {
  let authToken: string;
  let testUserId: string;
  const testFoodItems: IFoodItemDTO[] = [];
  const testMeals: IMealDTO[] = [];

  beforeAll(async () => {
    const userCredentials: IAuthSignUpDTO = {
      email: `test-foodItem-user-${Date.now()}@example.com`,
      password: "Password123!",
      confirmPassword: "Password123!",
      firstName: "foodItem",
      lastName: "Tester",
    };
    try {
      const userRes = await request(app)
        .post("/api/v1/auth/sign-up")
        .send(userCredentials);
      testUserId = userRes.body.data.id;
      authToken = userRes.headers["set-cookie"][0].split(";")[0].split("=")[1];
    } catch (error) {
      console.error("Error during user sign-up:", error);
    }

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
      try {
        const res = await request(app)
          .post("/api/v1/food-items/edit")
          .set("Cookie", `token=${authToken}`)

          .send(foodItem);
        if (res.status > 201) {
          throw new Error(
            `Failed to create food item: ${res.status} - ${res.text}`
          );
        }
        const created: IFoodItemDTO = res.body.data;
        testFoodItems.push(created);
      } catch (error) {
        console.error("Error creating food item:", error);
      }
    }
  });

  describe("POST /api/v1/meals/edit", () => {
    it("should create a new meal successfully", async () => {
      const newMeal: IMealEditDTO = {
        ownerId: testUserId,
        name: "should create a new meal successfully",
        mealType: "breakfast",
        notes: "This is a test meal",
        mealFoodItems: [
          {
            quantity: 100,
            foodItemId: testFoodItems[0].id,
            crudOperation: "create",
          },
          {
            quantity: 200,
            foodItemId: testFoodItems[1].id,
            crudOperation: "create",
          },
          {
            quantity: 150,
            foodItemId: testFoodItems[2].id,
            crudOperation: "create",
          },
        ],
        // images: [
        //   {
        //     url: "http://example.com/image1.jpg",
        //     description: "Image 1",
        //     isPrimary: true,
        //   },
        //   {
        //     url: "http://example.com/image2.jpg",
        //     description: "Image 2",
        //     isPrimary: false,
        //     altText: "Alt text for image 2",
        //     publicId: "public-id-123",
        //   },
        // ],
      };

      const res = await request(app)
        .post("/api/v1/meals/edit")
        .set("Cookie", `token=${authToken}`)
        .send(newMeal);

      const { status, body } = res;
      expect(status).toBe(201);
      expect(body).toHaveProperty("data");
      const savedMeal: IMealDTO = body.data;
      testMeals.push(savedMeal);
      expect(savedMeal).toHaveProperty("id");
      expect(savedMeal.name).toBe(newMeal.name?.toLowerCase());
      expect(savedMeal.mealType).toBe(newMeal.mealType);
      expect(savedMeal.notes).toBe(newMeal.notes?.toLowerCase());
      expect(savedMeal.mealFoodItems.length).toBe(3);
      expect(savedMeal.mealFoodItems).toEqual(
        expect.arrayContaining(
          newMeal?.mealFoodItems!.map((mfi) =>
            expect.objectContaining({
              quantity: mfi.quantity,
              foodItem: expect.objectContaining({
                id: mfi.foodItemId,
              }),
            })
          )
        )
      );
      // expect(savedMeal.images.length).toBe(2);
      // expect(savedMeal.images[0].url).toBe(newMeal?.images?.[0]?.url);
      // expect(savedMeal.images[0].isPrimary).toBe(true);
      // expect(savedMeal.images[1].url).toBe(newMeal?.images?.[1].url);
      // expect(savedMeal.images[1].altText).toBe(
      //   newMeal?.images?.[1].altText?.toLowerCase()
      // );
      // expect(savedMeal.images[1].publicId).toBe(newMeal.images?.[1].publicId);
    });

    it("should reject meal with missing required fields", async () => {
      const incompleteMeal = {
        ownerId: testUserId,
      };

      const res = await request(app)
        .post("/api/v1/meals/edit")
        .set("Cookie", `token=${authToken}`)
        .send(incompleteMeal);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      const { errors } = res.body;
      expect(errors.name).toBe("Meal name is required.");
      expect(errors.mealType).toBe("mealType is invalid.");
      expect(errors.mealFoodItems).toBe("At least one food item is required");
    });

    it("should reject meal with an invalid mealType", async () => {
      const invalidMealType: IMealEditDTO = {
        ownerId: testUserId,
        name: "Invalid Meal Type",
        mealType: "invalid-type" as any,
        mealFoodItems: [
          {
            quantity: 100,
            foodItemId: testFoodItems[0].id,
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/meals/edit")
        .set("Cookie", `token=${authToken}`)
        .send(invalidMealType);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors.mealType).toBeDefined();
    });

    it("should reject meal with an empty mealFoodItems array", async () => {
      const emptyFoodItemsMeal: IMealEditDTO = {
        ownerId: testUserId,
        name: "Empty Food Items",
        mealType: "lunch",
        mealFoodItems: [],
      };

      const res = await request(app)
        .post("/api/v1/meals/edit")
        .set("Cookie", `token=${authToken}`)
        .send(emptyFoodItemsMeal);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors.mealFoodItems).toBe(
        "At least one food item is required"
      );
    });

    it("should reject meal if a food item does not exist", async () => {
      const nonExistentFoodItemMeal: IMealEditDTO = {
        ownerId: testUserId,
        name: "Non-existent Food Item",
        mealType: "dinner",
        mealFoodItems: [
          {
            quantity: 100,
            foodItemId: " Non-existent ID",
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/meals/edit")
        .set("Cookie", `token=${authToken}`)
        .send(nonExistentFoodItemMeal);

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(
        /One or more referenced records not found/
      );
    });

    it("should reject request without authentication token", async () => {
      const newMeal: IMealEditDTO = {
        ownerId: testUserId,
        name: "Unauthorized Meal",
        mealType: "snack",
        mealFoodItems: [
          {
            quantity: 50,
            foodItemId: testFoodItems[0].id,
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app).post("/api/v1/meals/edit").send(newMeal);

      expect(res.status).toBe(401);
    });

    it("should sanitize HTML from name and notes", async () => {
      const mealWithHtml: IMealEditDTO = {
        ownerId: testUserId,
        name: "<h1>Sanitized</h1> <script>alert('xss')</script>Meal",
        mealType: "breakfast",
        notes: "<p>This is a <b>note</b> with HTML.</p>",
        mealFoodItems: [
          {
            quantity: 100,
            foodItemId: testFoodItems[3].id,
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/meals/edit")
        .set("Cookie", `token=${authToken}`)
        .send(mealWithHtml);

      expect(res.status).toBe(201);
      const savedMeal: IMealDTO = res.body.data;
      testMeals.push(savedMeal);
      expect(savedMeal.name).toBe("sanitized meal");
      expect(savedMeal.notes).toBe("this is a note with html.");
    });

    it("should trim and collapse whitespace in name and notes", async () => {
      const mealWithWhitespace: IMealEditDTO = {
        ownerId: testUserId,
        name: "   Meal   With    Extra   Whitespace  ",
        mealType: "lunch",
        notes: "  Notes with   spaces.  ",
        mealFoodItems: [
          {
            quantity: 120,
            foodItemId: testFoodItems[4].id,
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/meals/edit")
        .set("Cookie", `token=${authToken}`)
        .send(mealWithWhitespace);

      expect(res.status).toBe(201);
      const savedMeal: IMealDTO = res.body.data;
      testMeals.push(savedMeal);
      expect(savedMeal.name).toBe("meal with extra whitespace");
      expect(savedMeal.notes).toBe("notes with spaces.");
    });

    it("should reject if name becomes empty after sanitization", async () => {
      const mealWithOnlyHtml: IMealEditDTO = {
        ownerId: testUserId,
        name: "<script></script><b></b>",
        mealType: "dinner",
        mealFoodItems: [
          {
            quantity: 150,
            foodItemId: testFoodItems[5].id,
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/meals/edit")
        .set("Cookie", `token=${authToken}`)
        .send(mealWithOnlyHtml);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors.name).toBe(
        "Meal name must be at least 1 characters long"
      );
    });
  });

  describe("GET /api/v1/meals", () => {
    beforeAll(async () => {
      const mealsToCreate: IMealEditDTO[] = [
        {
          ownerId: testUserId,
          name: "Classic Breakfast",
          mealType: "breakfast",
          notes: "A hearty start to the day.",
          mealFoodItems: [
            {
              quantity: 150,
              foodItemId: testFoodItems[0].id,
              crudOperation: "create",
            },
            {
              quantity: 100,
              foodItemId: testFoodItems[1].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Quick Lunch",
          mealType: "lunch",
          notes: "Easy and fast.",
          mealFoodItems: [
            {
              quantity: 200,
              foodItemId: testFoodItems[2].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Family Dinner",
          mealType: "dinner",
          notes: "A big meal for everyone.",
          mealFoodItems: [
            {
              quantity: 250,
              foodItemId: testFoodItems[3].id,
              crudOperation: "create",
            },
            {
              quantity: 120,
              foodItemId: testFoodItems[4].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Afternoon Snack",
          mealType: "snack",
          notes: "Light and refreshing.",
          mealFoodItems: [
            {
              quantity: 80,
              foodItemId: testFoodItems[5].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Protein-Packed Breakfast",
          mealType: "breakfast",
          notes: "For muscle building.",
          mealFoodItems: [
            {
              quantity: 180,
              foodItemId: testFoodItems[6].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Salad Lunch",
          mealType: "lunch",
          notes: "Healthy and green.",
          mealFoodItems: [
            {
              quantity: 220,
              foodItemId: testFoodItems[7].id,
              crudOperation: "create",
            },
            {
              quantity: 50,
              foodItemId: testFoodItems[8].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Pasta Night",
          mealType: "dinner",
          notes: "Carb-loading for the win.",
          mealFoodItems: [
            {
              quantity: 300,
              foodItemId: testFoodItems[9].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Midnight Snack",
          mealType: "snack",
          notes: "A little something before bed.",
          mealFoodItems: [
            {
              quantity: 90,
              foodItemId: testFoodItems[10].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Oatmeal Breakfast",
          mealType: "breakfast",
          notes: "Warm and comforting.",
          mealFoodItems: [
            {
              quantity: 160,
              foodItemId: testFoodItems[11].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Sandwich Lunch",
          mealType: "lunch",
          notes: "A classic choice.",
          mealFoodItems: [
            {
              quantity: 210,
              foodItemId: testFoodItems[12].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Steak Dinner",
          mealType: "dinner",
          notes: "A weekend treat.",
          mealFoodItems: [
            {
              quantity: 280,
              foodItemId: testFoodItems[13].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Fruit Snack",
          mealType: "snack",
          notes: "Sweet and natural.",
          mealFoodItems: [
            {
              quantity: 110,
              foodItemId: testFoodItems[14].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Pancake Breakfast",
          mealType: "breakfast",
          notes: "Fluffy and delicious.",
          mealFoodItems: [
            {
              quantity: 190,
              foodItemId: testFoodItems[15].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Soup and Salad",
          mealType: "lunch",
          notes: "A light combination.",
          mealFoodItems: [
            {
              quantity: 230,
              foodItemId: testFoodItems[16].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Taco Tuesday",
          mealType: "dinner",
          notes: "Everyone's favorite.",
          mealFoodItems: [
            {
              quantity: 260,
              foodItemId: testFoodItems[17].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Yogurt Parfait",
          mealType: "snack",
          notes: "Layers of goodness.",
          mealFoodItems: [
            {
              quantity: 130,
              foodItemId: testFoodItems[18].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Avocado Toast",
          mealType: "breakfast",
          notes: "Trendy and tasty.",
          mealFoodItems: [
            {
              quantity: 170,
              foodItemId: testFoodItems[19].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Leftover Lunch",
          mealType: "lunch",
          notes: "Saving time.",
          mealFoodItems: [
            {
              quantity: 240,
              foodItemId: testFoodItems[0].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "BBQ Night",
          mealType: "dinner",
          notes: "Smoky and savory.",
          mealFoodItems: [
            {
              quantity: 320,
              foodItemId: testFoodItems[1].id,
              crudOperation: "create",
            },
          ],
        },
        {
          ownerId: testUserId,
          name: "Energy Bites",
          mealType: "snack",
          notes: "A quick boost.",
          mealFoodItems: [
            {
              quantity: 140,
              foodItemId: testFoodItems[2].id,
              crudOperation: "create",
            },
          ],
        },
      ];
      for (const meal of mealsToCreate) {
        const res = await request(app)
          .post("/api/v1/meals/edit")
          .set("Cookie", `token=${authToken}`)
          .send(meal);
        if (res.status <= 201) {
          testMeals.push(res.body.data);
        } else {
          console.error("Failed to create meal:", res.body);
        }
      }
    });

    it("should return all meals with default pagination", async () => {
      const res = await request(app)
        .get("/api/v1/meals")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(10);
      expect(res.body.meta.total).toBe(testMeals.length);
      expect(res.body.meta.currentPage).toBe(0);
      expect(res.body.meta.perPage).toBe(10);
    });

    it("should handle pagination correctly", async () => {
      const res = await request(app)
        .get("/api/v1/meals?skip=2&take=5")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(5);
      expect(res.body.meta.currentPage).toBe(2);
      expect(res.body.meta.perPage).toBe(5);
    });

    it("should filter meals by name case-insensitive", async () => {
      const res = await request(app)
        .get("/api/v1/meals?name=breakfast")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(4);
      res.body.data.forEach((meal: IMealDTO) => {
        expect(meal.name?.toLowerCase()).toContain("breakfast");
      });
    });

    it("should filter meals by mealType", async () => {
      const res = await request(app)
        .get("/api/v1/meals?mealType=snack")
        .set("Cookie", `token=${authToken}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(5);
      res.body.data.forEach((meal: IMealDTO) => {
        expect(meal.mealType).toBe("snack");
      });
    });

    // it("should sort meals by name in ascending order", async () => {
    //   const res = await request(app)
    //     .get("/api/v1/meals?orderBy=name&order=asc")
    //     .set("Cookie", `token=${authToken}`);

    //   expect(res.status).toBe(200);
    //   const names = res.body.data.map((meal: IMealDTO) => meal.name);
    //   const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    //   expect(names).toEqual(sortedNames);
    // });

    it("should combine filters mealType and name", async () => {
      const res = await request(app)
        .get("/api/v1/meals?mealType=lunch&name=salad")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data[0].name).toBe("salad lunch");
      expect(res.body.data[0].mealType).toBe("lunch");
    });

    it("should return an empty array if no meals match filters", async () => {
      const res = await request(app)
        .get("/api/v1/meals?name=nonexistentmeal")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(0);
      expect(res.body.meta.total).toBe(0);
    });

    it("should reject request with invalid query parameters", async () => {
      const res = await request(app)
        .get("/api/v1/meals?mealType=invalidtype")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors.mealType).toBeDefined();
    });
  });

  describe("PUT /api/v1/meals/edit/:id", () => {
    let mealToUpdate: IMealDTO;

    beforeEach(async () => {
      const baseMeal: IMealEditDTO = {
        ownerId: testUserId,
        name: "Meal to be Updated",
        mealType: "breakfast",
        notes: "Initial notes.",
        mealFoodItems: [
          {
            quantity: 100,
            foodItemId: testFoodItems[0].id,
            crudOperation: "create",
          },
          {
            quantity: 150,
            foodItemId: testFoodItems[1].id,
            crudOperation: "create",
          },
        ],
      };
      const res = await request(app)
        .post("/api/v1/meals/edit")
        .set("Cookie", `token=${authToken}`)
        .send(baseMeal);
      mealToUpdate = res.body.data;
      testMeals.push(mealToUpdate);
    });

    it("should update meal name successfully", async () => {
      const updateData: IMealEditDTO = {
        name: "Updated Meal Name",
        ownerId: testUserId,
      };

      const res = await request(app)
        .put(`/api/v1/meals/edit/${mealToUpdate.id}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(mealToUpdate.id);
      expect(res.body.data.name).toBe("updated meal name");
      expect(res.body.data.notes).toBe(mealToUpdate.notes);
    });

    it("should update meal notes and mealType", async () => {
      const updateData: IMealEditDTO = {
        notes: "These notes have been updated.",
        mealType: "dinner",
        ownerId: testUserId,
      };
      const res = await request(app)
        .put(`/api/v1/meals/edit/${mealToUpdate.id}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.notes).toBe("these notes have been updated.");
      expect(res.body.data.mealType).toBe("dinner");
      expect(res.body.data.name).toBe(mealToUpdate.name);
    });

    it("should add, update, and delete meal food items in one request", async () => {
      const updateData: IMealEditDTO = {
        ownerId: testUserId,
        mealFoodItems: [
          {
            id: mealToUpdate.mealFoodItems[0].id,
            quantity: 999,
            crudOperation: "update",
            foodItemId: mealToUpdate?.mealFoodItems?.[0].foodItem?.id,
          },
          { id: mealToUpdate.mealFoodItems[1].id, crudOperation: "delete" },
          {
            id: testFoodItems[2].id,
            crudOperation: "create",
            foodItemId: testFoodItems?.[2]?.id,
            quantity: 555,
          },
        ],
      };

      const res = await request(app)
        .put(`/api/v1/meals/edit/${mealToUpdate.id}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      const updatedMeal: IMealDTO = res.body.data;

      expect(updatedMeal.mealFoodItems.length).toBe(2);
      expect(updatedMeal.mealFoodItems).toContainEqual(
        expect.objectContaining({
          id: mealToUpdate.mealFoodItems[0].id,
          quantity: 999,
          foodItem: expect.objectContaining({
            name: mealToUpdate.mealFoodItems[0].foodItem?.name,
          }),
        })
      );

      expect(updatedMeal.mealFoodItems).toContainEqual(
        expect.objectContaining({
          quantity: 555,
          foodItem: expect.objectContaining({
            name: testFoodItems[2].name,
          }),
        })
      );

      expect(updatedMeal.mealFoodItems).not.toContainEqual(
        expect.objectContaining({
          id: mealToUpdate.mealFoodItems[1].id,
        })
      );
    });

    it("should sanitize HTML in updated name and notes", async () => {
      const updateData: IMealEditDTO = {
        name: "<h1>Updated</h1> <p>Meal</p>",
        notes: "<script>alert('xss')</script>Updated notes.",
        ownerId: testUserId,
      };
      const res = await request(app)
        .put(`/api/v1/meals/edit/${mealToUpdate.id}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("updated meal");
      expect(res.body.data.notes).toBe("updated notes.");
    });

    it("should reject update with invalid mealType", async () => {
      const updateData = { mealType: "invalid-meal-type", ownerId: testUserId };
      const res = await request(app)
        .put(`/api/v1/meals/edit/${mealToUpdate.id}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors.mealType).toBeDefined();
    });

    it("should reject if name becomes empty after sanitization", async () => {
      const updateData: IMealEditDTO = {
        name: "<b></b><script></script>",
        ownerId: testUserId,
      };
      const res = await request(app)
        .put(`/api/v1/meals/edit/${mealToUpdate.id}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors.name).toBe(
        "Meal name must be at least 1 characters long"
      );
    });

    it("should reject update if adding a non-existent food item", async () => {
      const updateData: IMealEditDTO = {
        ownerId: testUserId,
        mealFoodItems: [
          {
            foodItemId: "non-existent-food-item",
            quantity: 100,
            crudOperation: "create",
          },
        ],
      };
      const res = await request(app)
        .put(`/api/v1/meals/edit/${mealToUpdate.id}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(
        "One or more referenced records not found"
      );
    });

    it("should reject update for a non-existent meal ID", async () => {
      const updateData: IMealEditDTO = {
        name: "This will fail",
        ownerId: testUserId,
      };
      const res = await request(app)
        .put("/api/v1/meals/edit/non-existent-id")
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(
        "One or more referenced records not found"
      );
    });

    it("should reject update without authentication token", async () => {
      const updateData = { name: "This will also fail" };
      const res = await request(app)
        .put(`/api/v1/meals/edit/${mealToUpdate.id}`)
        .send(updateData);

      expect(res.status).toBe(401);
    });
  });

  describe("DELETE /api/v1/meals/:id", () => {
    let mealToDelete: IMealDTO;

    beforeEach(async () => {
      const newMeal: IMealEditDTO = {
        ownerId: testUserId,
        name: "Meal to be Deleted",
        mealType: "snack",
        mealFoodItems: [
          {
            quantity: 50,
            foodItemId: testFoodItems[0].id,
            crudOperation: "create",
          },
        ],
      };
      const res = await request(app)
        .post("/api/v1/meals/edit")
        .set("Cookie", `token=${authToken}`)
        .send(newMeal);
      mealToDelete = res.body.data;
      testMeals.push(mealToDelete);
    });

    it("should delete a meal successfully", async () => {
      const res = await request(app)
        .delete(`/api/v1/meals/${mealToDelete.id}`)
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);

      const getRes = await request(app)
        .get(`/api/v1/meals/${mealToDelete.id}`)
        .set("Cookie", `token=${authToken}`);
      expect(getRes.status).toBe(404);
    });

    it("should return 400 when trying to delete a non-existent meal", async () => {
      const res = await request(app)
        .delete("/api/v1/meals/non-existent-id")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(400);
    });

    it("should return 401 when trying to delete a meal without authentication", async () => {
      const res = await request(app).delete(`/api/v1/meals/${mealToDelete.id}`);

      expect(res.status).toBe(401);
    });

    it("should return 400 when trying to delete another user's meal", async () => {
      const otherUserCredentials: IAuthSignUpDTO = {
        email: `other-user-${Date.now()}@example.com`,
        password: "Password123!",
        confirmPassword: "Password123!",
        firstName: "Other",
        lastName: "User",
      };
      const otherUserRes = await request(app)
        .post("/api/v1/auth/sign-up")
        .send(otherUserCredentials);
      const otherUserId = otherUserRes.body.data.id;
      const otherAuthToken = otherUserRes.headers["set-cookie"][0]
        .split(";")[0]
        .split("=")[1];

      const otherUserMeal: IMealEditDTO = {
        ownerId: otherUserId,
        name: "Other User's Meal",
        mealType: "lunch",
        mealFoodItems: [
          {
            quantity: 100,
            foodItemId: testFoodItems[0].id,
            crudOperation: "create",
          },
        ],
      };
      const mealRes = await request(app)
        .post("/api/v1/meals/edit")
        .set("Cookie", `token=${otherAuthToken}`)
        .send(otherUserMeal);
      const otherMealId = mealRes.body.data.id;

      const res = await request(app)
        .delete(`/api/v1/meals/${otherMealId}`)
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(400);
      await request(app)
        .delete(`/api/v1/meals/${otherMealId}`)
        .set("Cookie", `token=${otherAuthToken}`);

      await request(app)
        .delete(`/api/v1/auth/delete-user/${otherUserId}`)
        .set("Cookie", `token=${otherAuthToken}`);
    });
  });

  afterAll(async () => {
    for (const meal of testMeals) {
      await request(app)
        .delete(`/api/v1/meals/${meal.id}`)
        .set("Cookie", `token=${authToken}`)
        .catch((err) => {
          console.error(err);
        });
    }

    for (const foodItem of testFoodItems) {
      await request(app)
        .delete(`/api/v1/food-items/${foodItem.id}`)
        .set("Cookie", `token=${authToken}`)
        .catch((err) => {
          console.error(err);
        });
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
