import mongoose from "mongoose";

interface ICountry {
  name: {
    common: string;
    official: string;
  };
  cca2: string; // ISO code (BD, US)
  cca3: string;
  callingCode: string;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
}
const countrySchema = new mongoose.Schema<ICountry>({
  name: {
    common: { type: String, required: true },
    official: { type: String, required: true },
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

countrySchema.statics.getCountries = async function () {
  const countries = await Country.find(
    {},
    { name: 1, callingCode: 1, _id: 1 },
  ).sort({ "name.common": 1 });
  const mapped = countries.map((country) => {
    return {
      _id: country._id,
      name: country.name.common,
      callingCode: country.callingCode,
    };
  });
  return mapped;
};

const Country = mongoose.model<ICountry>("Country", countrySchema);
export default Country;
