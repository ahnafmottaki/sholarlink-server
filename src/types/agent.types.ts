import mongoose from "mongoose";
import { IndividualRegister, OrganizationRegister } from "./auth.types";

interface Common {
  country: mongoose.Schema.Types.ObjectId;
  documentPath: string;
}
type Individual = Omit<IndividualRegister, "country"> & Common;
type Organization = Omit<OrganizationRegister, "country"> & Common;

type Agent = Individual | Organization;
export type { Agent };
