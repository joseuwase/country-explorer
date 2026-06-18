const BASE_URL = "https://restcountries.com/v3.1";

/* ---------------- GET ALL COUNTRIES ---------------- */
export async function getCountries() {

  const response = await fetch(`${BASE_URL}/all`);

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  return await response.json();
}

/* ---------------- GET COUNTRY BY NAME (OPTIONAL FEATURE) ---------------- */
export async function getCountryByName(name) {

  const response = await fetch(
    `${BASE_URL}/name/${name}?fullText=true`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch country details");
  }

  return await response.json();
}

/* ---------------- GET COUNTRY BY CODE (SAFE + NORMALIZED) ---------------- */
export async function getCountryByCode(code) {

  const response = await fetch(
    `${BASE_URL}/alpha/${code}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch border country");
  }

  const data = await response.json();

  // ✅ normalize API response (prevents main.js hacks)
  return Array.isArray(data) ? data[0] : data;
}