import { CreateCollectionOptions } from "mongodb";
import DOCUMENT_TYPES from "../constants/document-types";

const agentCollectionOptions: CreateCollectionOptions = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "password",
        "username",
        "document_path",
        "document_type",
        "country",
        "contact_no",
        "address",
      ],
      additionalProperties: true,
      properties: {
        username: {
          bsonType: "string",
          minLength: 3,
          maxLength: 20,
          pattern: "^[a-zA-Z0-9_]+$",
        },
        password: {
          bsonType: "string",
          minLength: 8,
          maxLength: 100,
        },
        country: {
          bsonType: "string",
          minLength: 2,
          maxLength: 100,
        },
        contact_no: {
          bsonType: "string",
          minLength: 10,
          maxLength: 15,
        },
        address: {
          bsonType: "string",
          minLength: 5,
          maxLength: 200,
        },
        account_type: {
          bsonType: "string",
          enum: ["individual", "organization"],
        },
        full_name: {
          bsonType: "string",
          minLength: 2,
          maxLength: 100,
        },
        email: {
          bsonType: "string",
          minLength: 5,
          maxLength: 100,
        },
        organization_name: {
          bsonType: "string",
          minLength: 2,
          maxLength: 100,
        },
        organization_email: {
          bsonType: "string",
          minLength: 5,
          maxLength: 100,
        },
        person_in_charge: {
          bsonType: "string",
          minLength: 2,
          maxLength: 100,
        },
        document_type: {
          bsonType: "string",
          enum: [...DOCUMENT_TYPES.individual, ...DOCUMENT_TYPES.organization],
        },
        document_path: {
          bsonType: "string",
          minLength: 1,
          maxLength: 200,
        },
      },
    },
  },
  validationAction: "error",
  validationLevel: "strict",
};

export { agentCollectionOptions };
