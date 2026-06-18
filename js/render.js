export function renderCountries(countries, onSelect = () => {}) {

  const container = document.getElementById("countries");

  container.innerHTML = countries
    .map(country => `
      <div class="card" data-name="${country.name}">

        <img
          src="${country.flag}"
          alt="Flag of ${country.name}"
        />

        <h3>${country.name}</h3>

        <p><strong>Region:</strong> ${country.region}</p>

        <p>
          <strong>Population:</strong>
          ${(country.population || 0).toLocaleString()}
        </p>

      </div>
    `)
    .join("");

  // attach click events safely (IMPORTANT FIX)
  container.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      const name = card.dataset.name;
      const selected = countries.find(c => c.name === name);
      if (selected) onSelect(selected);
    });
  });
}

/* ---------------- LOADING STATE ---------------- */
export function renderLoading() {

  document.getElementById("loading").textContent = "Loading countries...";
  document.getElementById("error").textContent = "";
  document.getElementById("countries").innerHTML = "";
}

/* ---------------- ERROR STATE ---------------- */
export function renderError(message) {

  document.getElementById("loading").textContent = "";
  document.getElementById("error").textContent = message;
  document.getElementById("countries").innerHTML = "";
}

/* ---------------- EMPTY STATE ---------------- */
export function renderEmpty(message) {

  document.getElementById("loading").textContent = "";
  document.getElementById("error").textContent = "";
  document.getElementById("countries").innerHTML = `<h2>${message}</h2>`;
}

/* ---------------- DETAIL VIEW ---------------- */
export function renderCountryDetail(country, borders = []) {

  const container = document.getElementById("countryDetail");

  container.innerHTML = `
    <div class="detail-card">

      <button id="closeDetail">Close</button>

      <img src="${country.flag}" alt="Flag of ${country.name}" />

      <h2>${country.name}</h2>

      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Region:</strong> ${country.region}</p>

      <p>
        <strong>Population:</strong>
        ${(country.population || 0).toLocaleString()}
      </p>

      <p>
        <strong>Area:</strong>
        ${country.area?.toLocaleString() || "N/A"}
      </p>

      <h3>Border Countries</h3>

      <div class="borders">
        ${
          borders.length
            ? borders.map(b => `<span>${b.name || "Unknown"}</span>`).join("")
            : "<p>No border countries</p>"
        }
      </div>

    </div>
  `;
}