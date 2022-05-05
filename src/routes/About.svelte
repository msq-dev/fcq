<script>
  import { fade } from "svelte/transition"

  const currentYear = new Date().getFullYear()

  $: copyright = `&copy;&#x200A;${
    currentYear !== 2022
      ? "2022&#x200A;&ndash;&#x200A;" + currentYear
      : currentYear
  }`
</script>

<main class="container" transition:fade={{ duration: 100, delay: 100 }}>
  <div class="title-block">
    <h1 class="page-title">Impressum</h1>
    <h2 class="subtitle">FCQ &mdash; Female Composers Quartets</h2>
  </div>
  <div class="company-block">
    <div class="title | bold">rost<span class="gray">ling</span></div>
    <div>Henrike Rost & Max Spuling</div>
    <a href="https://rostling.de/" class="link">rostling.de</a>
    <a href="mailto:kontakt@rostling.de" class="link">kontakt@rostling.de</a>
  </div>
  <div class="btn-container">
    <a
      title="Support us on ko-fi.com"
      class="kofi-button"
      style="background-color:#29abe0;"
      href="https://ko-fi.com/O5O2CGWA4"
      target="_blank"
    >
      <span class="kofitext"
        ><img
          src="https://storage.ko-fi.com/cdn/cup-border.png"
          alt="Ko-fi donations"
          class="kofiimg"
        />Support us on Ko-fi</span
      ></a
    >
  </div>
  <div class="text-block">
    <p>
      Wenn Sie unsere Arbeit an FCQ (Female Composers Quartets) unterstützen
      wollen, freuen wir uns.
    </p>
    <p>
      FCQ (Female Composers Quartets) versteht sich als „Work in Progress“. Wir
      sind uns bewusst, dass die vorliegende subjektive Auswahl kleinere und
      größere Lücken enthält, die der Freude am Entdecken und Spielen sicher
      keinen Abbruch tun. Anregungen zu Optimierungen und Hinweise auf Fehler
      sind jederzeit willkommen.
    </p>
    <p>
      Die App ist aus dem reichen online verfügbaren Informationsangebot
      hervorgegangen, dessen intensivere Erkundung wir anregen wollen.
      Ausdrücklich empfehlen möchten wir:
    </p>
  </div>
  <div class="source-block | container">
    <div class="source">
      <p>MUGI. Musik(vermittlung) und Gender(forschung) im Internet</p>
      <p>
        Hg. von Beatrix Borchard und Nina Noeske (Hochschule für Musik und
        Theater Hamburg 2003ff.)
      </p>
      <a href="https://mugi.hfmt-hamburg.de" class="link"
        >https://mugi.hfmt-hamburg.de</a
      >
    </div>
    <div class="source">
      <p>Instrumentalistinnen-Lexikon des Sophie Drinker Instituts</p>
      <p>Hg. von Freia Hoffmann</p>
      <a href="https://www.sophie-drinker-institut.de/lexikon" class="link"
        >https://www.sophie-drinker-institut.de/lexikon</a
      >
    </div>
    <div class="source">
      <p>
        Online-Fembio-Datenbank des Instituts für Frauen-Biographieforschung
      </p>
      <p>Hg. von Luise F. Pusch</p>
      <a href="https://www.fembio.org/" class="link">https://www.fembio.org/</a>
    </div>
    <div class="source">
      <p>
        Wikipedia-Seiten zu Komponistinnen (in ihrer Aktualität nicht zu
        unterschätzen)
      </p>
    </div>
  </div>
  <div class="text-block">
    <p>
      Fast alle verwendeten Abbildungen sind gemeinfrei und stammen von
      Wikipedia. Ausgenommen sind die Bilder von Sofia Gubaidulina (July 1981,
      Sortavala &copy; Dmitri N. Smirnov) sowie von Florence Price, Ruth Gipps,
      Kaija Saariaho, Unsuk Chin, Olga Neuwirth und Isabel Mundry. Für letztere
      Bilder verlinken wir auf andere Websites.
    </p>
    <p>
      Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
      oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum
      Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
      Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
    </p>
    <p>
      Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch
      ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
    </p>
    <p>
      Icons: <a href="https://feathericons.com/" class="link">Feather</a>
      made by
      <a href="https://twitter.com/colebemis" class="link">@colebemis</a>
    </p>
  </div>
  <div class="copyright">{@html copyright} rostling</div>
</main>

<style lang="scss">
  main {
    --vertical-rhythm: 1em;
    margin-bottom: 10vh;
  }

  .subtitle {
    text-transform: uppercase;
    font-size: 85%;
    font-weight: 320;
    letter-spacing: 0.15em;
  }

  .company-block {
    .link {
      display: block;
    }

    > * + * {
      margin-top: 0.2em;
    }

    .title {
      font-size: 160%;
    }

    .title .gray {
      color: var(--slate-400);
    }
  }

  .text-block {
    > p + p {
      margin-top: 0.5em;
    }
  }

  .source-block {
    --vertical-rhythm: 1em;
  }

  .source {
    > p:first-of-type {
      font-weight: var(--fw-bold);
      margin-bottom: 0.25em;
    }
  }

  .copyright {
    text-align: center;
    margin-top: 3.5em;
    font-size: 90%;
    color: var(--slate-400);
  }

  .btn-container {
    display: inline-block !important;
    white-space: nowrap;
    min-width: 160px;
  }

  a.kofi-button {
    box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.2);
    line-height: 36px !important;
    min-width: 150px;
    display: inline-block !important;
    background-color: #29abe0;
    padding: 2px 12px !important;
    text-align: center !important;
    border-radius: 7px;
    color: #fff;
    cursor: pointer;
    overflow-wrap: break-word;
    vertical-align: middle;
    border: 0 none #fff !important;
    font-family: "Quicksand", Helvetica, Century Gothic, sans-serif !important;
    text-decoration: none;
    text-shadow: none;
    font-weight: 500 !important;
    font-size: 14px !important;
  }

  span.kofitext {
    color: #fff !important;
    letter-spacing: -0.15px !important;
    text-wrap: none;
    vertical-align: middle;
    line-height: 33px !important;
    padding: 0;
    text-align: center;
    text-decoration: none !important;
    text-shadow: 0 1px 1px rgba(34, 34, 34, 0.05);
  }

  .kofiimg::after {
    vertical-align: middle;
    height: 25px;
    padding-top: 0;
    padding-bottom: 0;
    border: none;
    margin-top: 0;
    margin-right: 6px;
    margin-left: 0;
    margin-bottom: 4px !important;
    content: url("https://storage.ko-fi.com/cdn/whitelogo.svg");
  }

  .kofitext img.kofiimg {
    height: 15px !important;
    width: 22px !important;
    display: initial;
  }

  img.kofiimg {
    display: initial !important;
    vertical-align: middle;
    height: 13px !important;
    width: 20px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    border: none;
    margin-top: 0;
    margin-right: 5px !important;
    margin-left: 0 !important;
    margin-bottom: 3px !important;
    content: url("https://storage.ko-fi.com/cdn/cup-border.png");
  }
</style>
