import {
  getCountries,
  getCountryByCode
} from "./api.js";

import {
  renderCountries,
  renderCountryDetail,
  showLoading,
  showError,
  showEmpty,
  hideElement,
  hideStates
} from "./render.js";

/* ---------------- ELEMENTS ---------------- */
const countriesContainer = document.getElementById("countriesContainer");
const countryDetail = document.getElementById("countryDetail");
const detailContent = document.getElementById("detailContent");

const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("regionFilter");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const empty = document.getElementById("empty");

const retryBtn = document.getElementById("retryBtn");
const backBtn = document.getElementById("backBtn");

/* ---------------- STATE ---------------- */
let allCountries = [];
let filteredCountries = [];

/* ---------------- LOAD COUNTRIES ---------------- */
async function loadCountries() {
  try {
    hideStates(error, empty);
    showLoading(loading);

    allCountries = await getCountries();
    filteredCountries = [...allCountries];

    hideElement(loading);

    if (!allCountries.length) {
      showEmpty(empty);
      return;
    }

    renderCountries(countriesContainer, filteredCountries);

  } catch (err) {
    console.error(err);

    hideElement(loading);
    showError(error);
  }
}

/* ---------------- FILTER COUNTRIES ---------------- */
function filterCountries() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedRegion = regionFilter.value;

  filteredCountries = allCountries.filter(country => {
    const matchesSearch =
      country.name.toLowerCase().includes(searchText);

    const matchesRegion =
      !selectedRegion ||
      country.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  countriesContainer.innerHTML = "";

  if (filteredCountries.length === 0) {
    showEmpty(empty);
  } else {
    hideElement(empty);
    renderCountries(countriesContainer, filteredCountries);
  }
}

/* ---------------- SHOW DETAIL ---------------- */
async function showCountryDetails(code) {
  try {
    showLoading(loading);

    const country = await getCountryByCode(code);

    hideElement(loading);

    countriesContainer.classList.add("hidden");
    countryDetail.classList.remove("hidden");

    renderCountryDetail(detailContent, country);

  } catch (err) {
    console.error(err);

    hideElement(loading);
    showError(error);
  }
}

/* ---------------- EVENTS ---------------- */
searchInput.addEventListener("input", filterCountries);

regionFilter.addEventListener("change", filterCountries);

retryBtn.addEventListener("click", loadCountries);

backBtn.addEventListener("click", () => {
  countryDetail.classList.add("hidden");
  countriesContainer.classList.remove("hidden");
});

/* ---------------- CARD CLICK ---------------- */
countriesContainer.addEventListener("click", event => {
  const card = event.target.closest(".card");

  if (!card) return;

  const code = card.dataset.code;

  showCountryDetails(code);
});

/* ---------------- INIT ---------------- */
loadCountries();