import { CreateCollectionOptions } from "mongodb";
import { minLength } from "zod";

const adminCollectionOptions: CreateCollectionOptions = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "password", "role"],
      properties: {
        email: {
          bsonType: "string",
          minLength: 5,
          maxLength: 100,
        },
        password: {
          bsonType: "string",
          minLength: 8,
          maxLength: 100,
        },
        role: {
          bsonType: "string",
          enum: ["admin"],
        },
      },
      additionalProperties: false,
    },
  },
  validationAction: "error",
  validationLevel: "strict",
};

export default adminCollectionOptions;
