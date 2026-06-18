import { getCountries, getCountryByCode } from "./api.js";
import { renderCountries, renderCountryDetail } from "./render.js";

let allCountries = [];
let currentView = [];

async function init() {

  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  try {

    loading.textContent = "Loading countries...";
    error.textContent = "";

    const data = await getCountries();

    allCountries = data.map(c => ({
      name: c.name?.common || "Unknown",
      flag: c.flags?.png || "",
      population: c.population || 0,
      region: c.region || "Unknown",
      capital: c.capital?.[0] || "N/A",
      code: c.cca3 || "",
      borders: c.borders || []
    }));

    currentView = allCountries;

    loading.textContent = "";

    updateStats();
    renderList();

  } catch (err) {

    loading.textContent = "";
    error.textContent = "Something went wrong while loading data";
  }
}

/* ---------------- STATS ---------------- */
function updateStats() {

  const total = allCountries.length;

  const population = allCountries.reduce((sum, c) => {
    return sum + (c.population || 0);
  }, 0);

  document.getElementById("totalCountries").textContent =
    `Countries: ${total}`;

  document.getElementById("totalPopulation").textContent =
    `Population: ${population.toLocaleString()}`;
}

/* ---------------- RENDER LIST ---------------- */
function renderList() {
  renderCountries(currentView, handleSelect);
}

/* ---------------- SEARCH ---------------- */
document.getElementById("search").addEventListener("input", (e) => {

  const value = e.target.value.toLowerCase();

  currentView = allCountries.filter(c =>
    c.name.toLowerCase().includes(value)
  );

  renderList();
});

/* ---------------- FILTER ---------------- */
document.getElementById("regionFilter").addEventListener("change", (e) => {

  const region = e.target.value;

  if (!region) {
    currentView = allCountries;
  } else {
    currentView = allCountries.filter(c => c.region === region);
  }

  renderList();
});

/* ---------------- SORT ---------------- */
document.getElementById("sortBtn").addEventListener("click", () => {

  currentView = [...currentView].sort((a, b) => {
    return (b.population || 0) - (a.population || 0);
  });

  renderList();
});

/* ---------------- SELECT COUNTRY ---------------- */
function handleSelect(country) {
  openDetail(country);
}

/* ---------------- DETAIL ---------------- */
async function openDetail(country) {

  const container = document.getElementById("countryDetail");

  let borders = [];

  try {

    if (country.borders && country.borders.length > 0) {

      const results = await Promise.all(
        country.borders.map(async (code) => {
          try {
            return await getCountryByCode(code);
          } catch {
            return null;
          }
        })
      );

      borders = results.filter(Boolean);
    }

    renderCountryDetail(country, borders);

    container.style.display = "block";

    document.getElementById("closeDetail")?.addEventListener("click", () => {
      container.innerHTML = "";
      container.style.display = "none";
    });

  } catch (err) {
    console.log("Error loading details");
  }
}

init();