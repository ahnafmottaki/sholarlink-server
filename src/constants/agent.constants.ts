const ACCOUNT_TYPES = {
  individual: {
    identity_card: "Identity Card",
    nid: "National ID",
    passport: "Passport",
  },
  organization: {
    business_license: "Business License",
    organization_registration: "Organization Registration",
  },
} as const;

const STATUS = ["pending", "approved", "rejected"] as const;
type Status = (typeof STATUS)[number];

type Account = keyof typeof ACCOUNT_TYPES;
type GetType<T extends Account> = keyof (typeof ACCOUNT_TYPES)[T];
type DocumentTypes = GetType<"individual"> | GetType<"organization">;

export { type Account, type DocumentTypes, Status };
export { ACCOUNT_TYPES, STATUS };
