import { languageLabels, offeredLanguages, sectionMeta, useDataPackage } from '@museumwnf/viewer-core'
import {
  ISLAMICART_NO_COUNTRY, MinisiteHome, MinisiteShell, minisiteNavigation, minisiteRoutes, minisiteSettings,
} from '@museumwnf/viewer-layout/minisite'

// The whole declaration of this website: legacy Discover Islamic Art's virtual
// exhibition "The Abbasids" (islamicart.museumwnf.org/exhibitions/ISL/the_abbasids/),
// a website of its own. Its pages are every mini-site's — viewer-layout's
// `./minisite`, legacy's virtual exhibition pages — and what is this
// exhibition's own is here: its settings below, its theme (theme/tokens.css),
// its legacy pictures (theme/assets/legacy/, SOURCES.json names where each was
// taken from). Its records come from the data package, its texts from
// viewer-i18n's `minisite` bundle (and locales/, which may overload any).

const { manifest } = useDataPackage()

// The pictures of the frame, as Vite builds and fingerprints them; the pages
// name a file by its path under theme/assets/.
const chrome = import.meta.glob('../theme/assets/**/*.{jpg,jpeg,png,gif,svg}', {
  eager: true, query: '?url', import: 'default',
})

// The languages the exhibition has a title in: legacy's switcher offered them.
const languages = offeredLanguages()

// Discover Islamic Art, the website that carried this exhibition on legacy:
// its header, menu and sheet links lead there.
const parent = 'https://museumwithnofrontiers.github.io/islamicart'

export default {
  // The dataset package this website renders. Must match the alias in
  // vite.config.js and the dependency in package.json.
  datasetPackage: '@museumwnf/islamicart-the-abbasids-data',

  siteName: manifest.site?.names?.en ?? 'The Abbasids',

  // The absolute origin this build is deployed at, base path included, no
  // trailing slash: the GitHub Pages address of this repository.
  site: { origin: 'https://museumwithnofrontiers.github.io/islamicart-the-abbasids' },

  features: { entities: [] },

  languages,

  shell: MinisiteShell,

  chrome,

  navigation: minisiteNavigation({ languages: languageLabels(languages), parent }),

  // What legacy configured for this exhibition alone (the_abbasids/libs/
  // config.inc.php, index.php, ISL/libs/config.inc.php).
  minisite: minisiteSettings({
    parent,
    // The home menu's second column starts at this position ($_HOME_MENU_COL2).
    menuSecondColumnFrom: 7,
    // The curators the home page credits (HOMELOGOS): each partner's logo and the space after it.
    curators: [
      { partner: 'ee0a71f8-dc12-5d5d-b02a-4402969e8274', logo: 'legacy/TN-13.gif', space: 35 },
      { partner: 'f0c1b6b9-8198-5a97-9aea-8ebedfa90ca3', logo: 'legacy/ET-13.gif', space: 35 },
      { partner: 'd9f6c12d-ca03-5d6e-b33c-c1a37daec1fa', logo: 'legacy/GL-13.gif', space: 30 },
    ],
    // The introduction's map ($INTROPAGE_HAVEMAP): one picture per language.
    map: {
      thumbnail: 'legacy/intro_map_thumb.jpg',
      picture: (lang, n) => (n ? `legacy/map${n}_${lang}.jpg` : `legacy/map_${lang}.jpg`),
      count: 1,
    },
    noCountry: ISLAMICART_NO_COUNTRY,
    documentTitle: 'MWNF DISCOVER ISLAMIC ART: Exhibition',
  }),

  views: { home: MinisiteHome },

  extraViews: minisiteRoutes(sectionMeta()),

  legacyRoutes: [],
}
