import mongoose from "mongoose";
import { env } from "../config/env";
import { sv } from "zod/v4/locales";

const countrySchema = new mongoose.Schema({
  name: {
    common: String,
    official: String,
  },
  cca2: String, // ISO code (BD, US)
  cca3: String,
  callingCode: String,
  flags: {
    png: String,
    svg: String,
    alt: String,
  },
});

const Country = mongoose.model("Country", countrySchema);
// const seedCountries = async () => {
//   await mongoose.connect(env.MONGO_URI);
//   const res = await fetch(
//     "https://restcountries.com/v3.1/all?fields=name,cca2,idd,cioc,flags",
//   );
//   const data: any[] = await res.json();
//   const countries = data.map((c) => ({
//     name: {
//       common: c.name.common,
//       official: c.name.official,
//     },
//     cca2: c.cca2,
//     cca3: c.cca3,
//     callingCode: c.idd?.root ? c.idd.root + (c.idd.suffixes?.[0] || "") : "",
//     flags: {
//       png: c.flags.png,
//       svg: c.flags.svg,
//       alt: c.flags.alt,
//     },
//   }));
//   await Country.deleteMany();
//   await Country.insertMany(countries);
//   console.log("Countries seeded successfully");
//   process.exit();
// };
// seedCountries();

export default Country;
