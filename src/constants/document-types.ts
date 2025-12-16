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

type Account = keyof typeof ACCOUNT_TYPES;

export { type Account, ACCOUNT_TYPES };
