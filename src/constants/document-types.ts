const DOCUMENT_TYPES = {
  individual: ["identity_card", "nid", "passport"],
  organization: ["business_license", "organization_registration"],
} as const;
export default DOCUMENT_TYPES;
