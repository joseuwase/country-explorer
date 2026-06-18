/* ---------------- RENDER COUNTRIES ---------------- */
export function renderCountries(container, countries) {
  container.innerHTML = "";

  countries.forEach(country => {
    const card = document.createElement("article");
    card.classList.add("card");

    card.dataset.code = country.cca3;

    card.innerHTML = `
      <img src="${country.flag}" alt="Flag of ${country.name}" />

      <div class="card-content">
        <h3>${country.name}</h3>

        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>

        <p><strong>Region:</strong> ${country.region}</p>

        <p><strong>Capital:</strong> ${country.capital}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

/* ---------------- RENDER DETAIL VIEW ---------------- */
export function renderCountryDetail(container, country) {
  container.innerHTML = `
    <div class="detail-layout">

      <div>
        <img
          src="${country.flag}"
          alt="Flag of ${country.name}"
        />
      </div>

      <div class="detail-info">
        <h2>${country.name}</h2>

        <p>
          <strong>Official Name:</strong>
          ${country.officialName}
        </p>

        <p>
          <strong>Capital:</strong>
          ${country.capital}
        </p>

        <p>
          <strong>Population:</strong>
          ${country.population.toLocaleString()}
        </p>

        <p>
          <strong>Region:</strong>
          ${country.region}
        </p>

        <p>
          <strong>Subregion:</strong>
          ${country.subregion}
        </p>

        <p>
          <strong>Languages:</strong>
          ${country.languages}
        </p>

        <p>
          <strong>Currencies:</strong>
          ${country.currencies}
        </p>
      </div>

    </div>
  `;
}

/* ---------------- LOADING STATE ---------------- */
export function showLoading(element) {
  element.classList.remove("hidden");
}

/* ---------------- HIDE STATE ---------------- */
export function hideElement(element) {
  element.classList.add("hidden");
}

/* ---------------- ERROR STATE ---------------- */
export function showError(errorElement) {
  errorElement.classList.remove("hidden");
}

/* ---------------- EMPTY STATE ---------------- */
export function showEmpty(emptyElement) {
  emptyElement.classList.remove("hidden");
}

/* ---------------- HIDE ALL STATES ---------------- */
export function hideStates(...elements) {
  elements.forEach(element => {
    element.classList.add("hidden");
  });
}