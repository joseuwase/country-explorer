const BASE_URL = "https://restcountries.com/v3.1";

/* ---------------- GET ALL COUNTRIES ---------------- */
export async function getCountries() {
  try {
    const response = await fetch(`${BASE_URL}/all`);

    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    const data = await response.json();

    return data.map(country => ({
      name: country.name?.common || "Unknown",
      officialName: country.name?.official || "Unknown",
      flag: country.flags?.png || "",
      population: country.population || 0,
      region: country.region || "N/A",
      subregion: country.subregion || "N/A",
      capital: country.capital?.[0] || "N/A",
      languages: country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A",
      currencies: country.currencies
        ? Object.values(country.currencies)
            .map(currency => currency.name)
            .join(", ")
        : "N/A",
      cca3: country.cca3
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ---------------- GET COUNTRY BY CODE ---------------- */
export async function getCountryByCode(code) {
  try {
    const response = await fetch(`${BASE_URL}/alpha/${code}`);

    if (!response.ok) {
      throw new Error("Failed to fetch country details");
    }

    const data = await response.json();
    const country = data[0];

    return {
      name: country.name?.common || "Unknown",
      officialName: country.name?.official || "Unknown",
      flag: country.flags?.png || "",
      population: country.population || 0,
      region: country.region || "N/A",
      subregion: country.subregion || "N/A",
      capital: country.capital?.[0] || "N/A",
      languages: country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A",
      currencies: country.currencies
        ? Object.values(country.currencies)
            .map(currency => currency.name)
            .join(", ")
        : "N/A",
      cca3: country.cca3
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ---------------- PROMISE.ALL EXAMPLE ---------------- */
export async function getInitialData() {
  try {
    const [allCountries, africaCountries] = await Promise.all([
      fetch(`${BASE_URL}/all`),
      fetch(`${BASE_URL}/region/africa`)
    ]);

    if (!allCountries.ok || !africaCountries.ok) {
      throw new Error("Failed to load initial data");
    }

    const countries = await allCountries.json();
    const africa = await africaCountries.json();

    return {
      countries,
      africa
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}