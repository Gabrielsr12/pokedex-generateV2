"use strict";
var slide_hero = new Swiper(".slide-hero", {
    pagination: {
      el: ".s-area-slide-hero .slide-hero .main-area .area-explore .swiper-pagination",
    },
    effect: "fade",
    autoplay: { delay: 4e3, disableOnInteraction: !1 },
    keyboard: { enabled: !0 },
  }),
  areaPokemons = document.getElementById("js-list-pokemons");
function createCardPokemon(e, t, o, n) {
  var a = document.createElement("button");
  (a.classList = "card-pokemon ".concat(t, " js-open-pokemon")),
    a.setAttribute("idpokemon", e),
    areaPokemons.appendChild(a);
  var i = document.createElement("div");
  (i.classList = "image"), a.appendChild(i);
  var s = document.createElement("img");
  s.setAttribute("src", n), i.appendChild(s);
  i = document.createElement("div");
  (i.classList = "info"), a.appendChild(i);
  s = document.createElement("div");
  i.appendChild(s);
  a = document.createElement("span");
  (a.textContent = (e < 10 ? "#00" : e < 100 ? "#0" : "#").concat(e)),
    s.appendChild(a);
  a = document.createElement("strong");
  (a.textContent = primeiraLetraMaiuscula(o)), s.appendChild(a);
  a = document.createElement("div");
  (a.classList = "icon"), i.appendChild(a);
  i = document.createElement("img");
  i.setAttribute("src", "img/".concat(t, ".svg")), a.appendChild(i);
}
function listingPokemons(e) {
  axios({ method: "GET", url: e }).then(function (e) {
    var t = e.data.results;
    (countPoks.textContent = e.data.count),
      t.forEach(function (e) {
        e = e.url;
        axios({ method: "GET", url: "".concat(e) }).then(function (e) {
          var t = e.data,
            o = t.name,
            n = t.id,
            e = t.sprites,
            t = t.types,
            t = {
              nome: o,
              code: n,
              image: e.other.dream_world.front_default,
              type: t[0].type.name,
            };
          createCardPokemon(t.code, t.type, t.nome, t.image),
            document.querySelectorAll(".js-open-pokemon").forEach(function (e) {
              e.addEventListener("click", openDetailsPokemon);
            });
        });
      });
  });
}
function primeiraLetraMaiuscula(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");
var btnCloseDetailsPokemon = document.querySelector(
    ".js-close-details-pokemon"
  ),
  bgModalPokemon = document.querySelector(".modal .left-container"),
  iconTypeModalPokemon = document.querySelector(
    ".modal .box .left-container .icon img"
  ),
  imgModalPokemon = document.getElementById("js-image-pokemon"),
  nomeModalPokemon = document.querySelector(
    ".modal .box .right-container .name h2"
  ),
  idModalPokemon = document.querySelector(
    ".modal .box .right-container .name span"
  ),
  typesModalPokemon = document.querySelector(
    ".modal .box .right-container .type"
  ),
  WeakModalPokemon = document.querySelector(
    ".modal .box .right-container .weak ul"
  ),
  heightModalPokemon = document.getElementById("js-pok-height"),
  weightModalPokemon = document.getElementById("js-pok-weight"),
  abilitieModalPokemon = document.getElementById("js-pok-abilitie"),
  buttonShowMoreAbilities = document.getElementById("js-show-more-abilities"),
  ballonAbilities = document.getElementById("js-ballon-abilities"),
  statsHpModalPokemon = document.getElementById("js-bar-hp"),
  statsAttackModalPokemon = document.getElementById("js-bar-attack"),
  statsDefenseModalPokemon = document.getElementById("js-bar-defense"),
  statsSpAttackModalPokemon = document.getElementById("js-bar-sp-attack"),
  statsSpDefenseModalPokemon = document.getElementById("js-bar-sp-defense"),
  statsSpeedModalPokemon = document.getElementById("js-bar-speed");
function openDetailsPokemon() {
  document.documentElement.classList.add("open-modal");
  var o = this.getAttribute("idPokemon"),
    e = this.firstElementChild.firstElementChild.getAttribute("src"),
    t =
      this.lastElementChild.lastElementChild.firstElementChild.getAttribute(
        "src"
      );
  imgModalPokemon.setAttribute("src", e),
    iconTypeModalPokemon.setAttribute("src", t),
    axios({
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon/".concat(o, "/"),
    }).then(function (e) {
      var t = e.data,
        e = {
          id: o,
          mainType: t.types[0].type.name,
          name: primeiraLetraMaiuscula(t.name),
          types: t.types,
          urlType: t.types[0].type.url,
          height: t.height,
          weight: t.weight,
          abilities: t.abilities,
          stats: t.stats,
        };
      bgModalPokemon.setAttribute("bgType", e.mainType),
        (nomeModalPokemon.textContent = e.name),
        (idModalPokemon.textContent = (
          e.id < 10 ? "#00" : e.id < 100 ? "#0" : "#"
        ).concat(e.id)),
        (heightModalPokemon.textContent = "".concat(e.height / 10, "m")),
        (weightModalPokemon.textContent = "".concat(e.weight / 10, "kg")),
        (abilitieModalPokemon.textContent = primeiraLetraMaiuscula(
          e.abilities[0].ability.name
        )),
        1 === t.abilities.length &&
          (buttonShowMoreAbilities.style.display = "none"),
        (buttonShowMoreAbilities.classList = "tag ".concat(e.mainType)),
        (ballonAbilities.innerHTML = ""),
        (ballonAbilities.classList = "ballon ".concat(e.mainType)),
        t.abilities.forEach(function (e, t) {
          0 < t &&
            (((t = document.createElement("strong")).textContent =
              primeiraLetraMaiuscula(e.ability.name)),
            ballonAbilities.appendChild(t));
        }),
        (statsHpModalPokemon.style.width = "".concat(
          t.stats[0].base_stat,
          "%"
        )),
        (statsAttackModalPokemon.style.width = "".concat(
          t.stats[1].base_stat,
          "%"
        )),
        (statsDefenseModalPokemon.style.width = "".concat(
          t.stats[2].base_stat,
          "%"
        )),
        (statsSpAttackModalPokemon.style.width = "".concat(
          t.stats[3].base_stat,
          "%"
        )),
        (statsSpDefenseModalPokemon.style.width = "".concat(
          t.stats[4].base_stat,
          "%"
        )),
        (statsSpeedModalPokemon.style.width = "".concat(
          t.stats[5].base_stat,
          "%"
        )),
        (t = e.types),
        (typesModalPokemon.innerHTML = ""),
        t.forEach(function (e) {
          var t = document.createElement("li");
          (t.textContent = primeiraLetraMaiuscula(e.type.name)),
            (t.classList = "tag ".concat(e.type.name)),
            typesModalPokemon.appendChild(t);
        }),
        (WeakModalPokemon.innerHTML = ""),
        axios({ method: "GET", url: "".concat(e.urlType) }).then(function (e) {
          e.data.damage_relations.double_damage_from.forEach(function (e) {
            var t = document.createElement("li");
            (t.textContent = primeiraLetraMaiuscula(e.name)),
              (t.classList = "tag ".concat(e.name)),
              WeakModalPokemon.appendChild(t);
          });
        });
    });
}
function closeDetailsPokemon() {
  document.documentElement.classList.remove("open-modal");
}
btnCloseDetailsPokemon.addEventListener("click", closeDetailsPokemon),
  buttonShowMoreAbilities.addEventListener("click", function () {
    buttonShowMoreAbilities.parentElement.classList.toggle("active");
  }),
  buttonShowMoreAbilities.addEventListener("mouseleave", function () {
    buttonShowMoreAbilities.parentElement.classList.remove("active");
  });
var countPoks = document.querySelector(".js-count-pokemons"),
  countPagination = 10;
function showMorePokemon() {
  listingPokemons(
    "https://pokeapi.co/api/v2/pokemon?limit=9&offset=".concat(countPagination)
  ),
    (countPagination += 9),
    (countPoks.textContent = countPagination - 1);
}
var btnShowMore = document.getElementById("js-show-more");
btnShowMore.addEventListener("click", showMorePokemon);
var areaTypes = document.getElementById("js-area-types"),
  areaTypesSelect = document.querySelector(".select-custom .dropdown-select");
axios({ method: "GET", url: "https://pokeapi.co/api/v2/type/" }).then(function (
  e
) {
  e.data.results.forEach(function (e, t) {
    var o, n, a, i;
    t < 18 &&
      ((a = document.createElement("li")),
      areaTypes.appendChild(a),
      (i = document.createElement("li")),
      areaTypesSelect.appendChild(i),
      ((o = document.createElement("button")).classList =
        "js-filter-type-pokemon ".concat(e.name)),
      o.setAttribute("code-type", t + 1),
      a.appendChild(o),
      ((n = document.createElement("button")).classList =
        "js-filter-type-pokemon ".concat(e.name)),
      n.setAttribute("code-type", t + 1),
      i.appendChild(n),
      ((a = document.createElement("div")).classList = "icon"),
      o.appendChild(a),
      ((t = document.createElement("div")).classList = "icon"),
      n.appendChild(t),
      (i = document.createElement("img")).setAttribute(
        "src",
        "img/".concat(e.name, ".svg")
      ),
      a.appendChild(i),
      (i = document.createElement("img")).setAttribute(
        "src",
        "img/".concat(e.name, ".svg")
      ),
      t.appendChild(i),
      ((i = document.createElement("span")).textContent =
        primeiraLetraMaiuscula(e.name)),
      o.appendChild(i),
      ((i = document.createElement("span")).textContent =
        primeiraLetraMaiuscula(e.name)),
      n.appendChild(i),
      document
        .querySelectorAll(".js-filter-type-pokemon")
        .forEach(function (e) {
          e.addEventListener("click", filterByTypes);
        }));
  });
});
var inputSearch = document.getElementById("js-input-search");
function filterByTypes() {
  (areaPokemons.innerHTML = ""),
    (inputSearch.value = ""),
    (btnSearch.disabled = !0),
    document
      .querySelectorAll(
        ".s-all-info-pokemons .area-all .left-container ul li button"
      )
      .forEach(function (e) {
        e.classList.remove("active");
      }),
    this.classList.add("active");
  var e = document.querySelector(".s-all-info-pokemons").offsetTop;
  window.scrollTo({ top: e + 288, behavior: "smooth" });
  e = this.getAttribute("code-type");
  e
    ? ((btnShowMore.style.display = "none"),
      axios({
        method: "GET",
        url: "https://pokeapi.co/api/v2/type/".concat(e),
      }).then(function (e) {
        e = e.data.pokemon;
        (countPoks.textContent = e.length),
          e.forEach(function (e) {
            e = e.pokemon.url;
            axios({ method: "GET", url: "".concat(e) }).then(function (e) {
              var t = e.data,
                o = t.name,
                n = t.id,
                e = t.sprites,
                t = t.types,
                t = {
                  nome: o,
                  code: n,
                  image: e.other.dream_world.front_default,
                  type: t[0].type.name,
                };
              null !== t.image &&
                createCardPokemon(t.code, t.type, t.nome, t.image),
                document
                  .querySelectorAll(".js-open-pokemon")
                  .forEach(function (e) {
                    e.addEventListener("click", openDetailsPokemon);
                  });
            });
          });
      }))
    : ((btnShowMore.style.display = "block"),
      listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0"),
      (countPoks.textContent = 9)),
    areaTypesSelect.parentElement.classList.remove("active");
  e = this.lastElementChild.textContent;
  areaTypesSelect.parentElement.firstElementChild.lastElementChild.textContent =
    e;
}
var btnSearch = document.getElementById("js-btn-search-pokemon");
function searchPokemon() {
  document.querySelectorAll(".js-filter-type-pokemon").forEach(function (e) {
    e.classList.remove("active");
  });
  var e = btnSearch.parentElement.firstElementChild.value.toLowerCase();
  axios({ method: "GET", url: "https://pokeapi.co/api/v2/pokemon/".concat(e) })
    .then(function (e) {
      (areaPokemons.innerHTML = ""),
        (btnShowMore.style.display = "none"),
        (countPoks.textContent = 1);
      var t = e.data,
        o = t.name,
        n = t.id,
        e = t.sprites,
        t = t.types,
        t = {
          nome: o,
          code: n,
          image: e.other.dream_world.front_default,
          type: t[0].type.name,
        };
      createCardPokemon(t.code, t.type, t.nome, t.image),
        document.querySelectorAll(".js-open-pokemon").forEach(function (e) {
          e.addEventListener("click", openDetailsPokemon);
        });
    })
    .catch(function (e) {
      e.response &&
        ((countPoks.textContent = 0),
        (areaPokemons.innerHTML = ""),
        (btnShowMore.style.display = "none"),
        console.log("Erro da requisicao"));
    });
}
(btnSearch.disabled = !0),
  btnSearch.addEventListener("click", searchPokemon),
  inputSearch.addEventListener("keyup", function (e) {
    0 < inputSearch.value.length
      ? (btnSearch.disabled = !1)
      : (btnSearch.disabled = !0),
      "Enter" === e.code && searchPokemon();
  });
var selectCustom = document.querySelector(".js-select-custom");
function openSelectCustom() {
  this.parentElement.classList.toggle("active");
}
selectCustom.addEventListener("click", openSelectCustom);
