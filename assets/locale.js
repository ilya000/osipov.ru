(function () {
  var translations = {
    en: {
      lang: "en",
      title: "Ilya Osipov",
      description: "Personal website of Ilya Osipov.",
      h1: "Ilya Osipov",
      links: "Links",
      social: "Social networks",
      newSite: "new site",
      projects: "projects"
    },
    ru: {
      lang: "ru",
      title: "Илья Осипов",
      description: "Персональный сайт Ильи Осипова.",
      h1: "Илья Осипов",
      links: "Ссылки",
      social: "Социальные сети",
      newSite: "новый сайт",
      projects: "проекты"
    },
    sr: {
      lang: "sr-Latn",
      title: "Ilja Osipov",
      description: "Lični sajt Ilje Osipova.",
      h1: "Ilja Osipov",
      links: "Linkovi",
      social: "Društvene mreže",
      newSite: "novi sajt",
      projects: "projekti"
    }
  };

  var russianTimeZones = [
    "Europe/Kaliningrad",
    "Europe/Moscow",
    "Europe/Simferopol",
    "Europe/Kirov",
    "Europe/Volgograd",
    "Europe/Astrakhan",
    "Europe/Saratov",
    "Europe/Ulyanovsk",
    "Europe/Samara",
    "Asia/Yekaterinburg",
    "Asia/Omsk",
    "Asia/Novosibirsk",
    "Asia/Barnaul",
    "Asia/Tomsk",
    "Asia/Novokuznetsk",
    "Asia/Krasnoyarsk",
    "Asia/Irkutsk",
    "Asia/Chita",
    "Asia/Yakutsk",
    "Asia/Khandyga",
    "Asia/Vladivostok",
    "Asia/Ust-Nera",
    "Asia/Magadan",
    "Asia/Sakhalin",
    "Asia/Srednekolymsk",
    "Asia/Kamchatka",
    "Asia/Anadyr"
  ];

  function getTimeZone() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch (error) {
      return "";
    }
  }

  function startsWithAny(value, prefixes) {
    return prefixes.some(function (prefix) {
      return value.indexOf(prefix) === 0;
    });
  }

  function chooseLocale() {
    var forcedLocale = (location.search.match(/[?&]lang=(ru|sr|en)\b/) || [])[1];
    if (forcedLocale) return forcedLocale;

    var languages = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""])
      .map(function (language) { return language.toLowerCase(); });
    var timeZone = getTimeZone();

    if (languages.some(function (language) { return startsWithAny(language, ["ru"]); }) ||
        russianTimeZones.indexOf(timeZone) !== -1) {
      return "ru";
    }

    if (languages.some(function (language) { return startsWithAny(language, ["sr", "sh"]); }) ||
        timeZone === "Europe/Belgrade") {
      return "sr";
    }

    return "en";
  }

  function applyLocale(locale) {
    var text = translations[locale] || translations.en;
    var description = document.querySelector('meta[name="description"]');
    var heading = document.querySelector("h1");
    var menu = document.querySelector(".menu");
    var social = document.querySelector(".social");

    document.documentElement.lang = text.lang;
    document.title = text.title;
    if (description) description.setAttribute("content", text.description);
    if (heading) heading.textContent = text.h1;
    if (menu) menu.setAttribute("aria-label", text.links);
    if (social) social.setAttribute("aria-label", text.social);

    Object.keys(text).forEach(function (key) {
      var node = document.querySelector('[data-i18n="' + key + '"]');
      if (node) node.textContent = text[key];
    });
  }

  applyLocale(chooseLocale());
}());
