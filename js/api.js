const BASE_URL = "https://restcountries.com/v3.1";

/* ---------------- CORE REQUEST HANDLER ---------------- */
async function request(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

/* ---------------- GET ALL COUNTRIES ---------------- */
export function getCountries() {
  return request("/all");
}

/* ---------------- GET COUNTRY BY NAME ---------------- */
export function getCountryByName(name) {
  return request(`/name/${encodeURIComponent(name)}?fullText=true`);
}

/* ---------------- GET COUNTRY BY CODE ---------------- */
export async function getCountryByCode(code) {
  const data = await request(`/alpha/${code}`);

  // API sometimes returns array or object depending on endpoint behavior
  return Array.isArray(data) ? data[0] : data;
}