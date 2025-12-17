import storageService from "../services/storage.service";
export function buildRegistryDocName(
  username: string,
  accountType: string,
  documentType: string,
) {
  return `${storageService.registryFolder}/${username}-${accountType}-${documentType}-${new Date().toISOString()}.pdf`;
}
