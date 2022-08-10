<script lang="ts">
  import { swr } from "@svelte-drama/swr";
  import type { Weather } from "./types/Weather";
  import { fetchWeather } from "./utils/fetcher";
  import HumidityIcon from "./components/HumidityIcon.svelte";
  import PressureIcon from "./components/PressureIcon.svelte";
  import WindIcon from "./components/WindIcon.svelte";

  const { data } = swr<Weather>(`/api/weather`, fetchWeather);

  let stats: any[];
  $: if ($data) {
    document.title = `Weather forecast in ${$data.location.name}`;
    stats = [
      { icon: WindIcon, value: `${$data.current.wind_mph} mph` },
      { icon: HumidityIcon, value: `${$data.current.humidity}%` },
      { icon: PressureIcon, value: `${$data.current.pressure_in} in` },
    ];
  }
</script>

<main>
  {#if $data}
    <section class="weather">
      <span class="temperature">{$data.current.temp_f}°</span>
      <span class="condition">{$data.current.condition.text}</span>
    </section>
    <section class="details">
      <h1 class="location">{$data.location.name}</h1>
      <time class="date" datetime={$data.location.localtime.split(" ")[0]}>
        {new Date($data.location.localtime).toLocaleDateString("en", {
          month: "long",
          day: "numeric",
        })}
      </time>
      <time class="time" datetime={$data.location.localtime.split(" ")[1]}>
        {new Date($data.location.localtime).toLocaleTimeString("en", {
          month: "long",
          day: "numeric",
        })}
      </time>
      <ul>
        {#each stats as { icon: Icon, value }}
          <li class="stats">
            <Icon />
            <span>{value}</span>
          </li>
        {/each}
      </ul>
    </section>
  {/if}
</main>

<style>
  :root {
    --aqua: #7fdbff;
    --blue: #0074d9;
    --navy: #001f3f;
    --teal: #39cccc;
    --olive: #3d9970;
    --yellow: #ffdc00;
    --orange: #ff851b;
    --white: #ffffff;
    --black: #111111;
    --from: var(--blue);
    --to: var(--aqua);
  }

  :global(html),
  :global(body) {
    height: 100%;
  }

  :global(body) {
    background: linear-gradient(to bottom, var(--from) 0%, var(--to) 70%);
    color: var(--black);
    font-family: "Fira Mono", Verdana, Geneva, Tahoma, sans-serif;
    font-size: 16px;
    line-height: 1.5;
  }

  .temperature {
    display: block;
    font-size: 4em;
    font-weight: 500;
  }

  .condition {
    display: block;
    font-size: 1.5em;
  }

  .location {
    display: block;
    font-size: 1.5em;
    font-weight: 700;
  }

  .location::after {
    background-color: var(--black);
    content: "";
    display: block;
    height: 2px;
    margin-bottom: 0.75rem;
    width: 30%;
  }

  .date {
    display: block;
    font-size: 2.25em;
  }

  .time {
    display: block;
    margin-bottom: 2.5rem;
  }

  .stats {
    align-items: center;
    column-gap: 0.25rem;
    display: inline-flex;
    margin-right: 0.75rem;
  }

  .details {
    background-color: var(--white);
    bottom: 0;
    box-sizing: border-box;
    left: 0;
    padding: 3rem;
    position: absolute;
    width: 100%;
    z-index: 40;
  }

  .details::before {
    background-image: url('data:image/svg+xml,<svg width="390" height="87" viewBox="0 0 390 87" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 14.2243L8.06 10.4437C16.2067 6.5636 32.3267 -0.997661 48.7067 1.78806C65 4.57379 81.4667 17.9055 97.76 17.5075C114.14 17.209 130.26 3.28042 146.467 0.793162C162.673 -1.69409 178.793 7.26003 195 7.45901C211.207 7.55851 227.327 -0.997673 243.707 0.0967189C260 1.2906 276.467 12.2345 292.76 19.3978C309.14 26.4616 325.26 29.8443 341.467 29.9438C357.673 30.1427 373.793 27.1581 381.94 25.6657L390 24.1733V58H381.94C373.793 58 357.673 58 341.467 58C325.26 58 309.14 58 292.76 58C276.467 58 260 58 243.707 58C227.327 58 211.207 58 195 58C178.793 58 162.673 58 146.467 58C130.26 58 114.14 58 97.76 58C81.4667 58 65 58 48.7067 58C32.3267 58 16.2067 58 8.06 58H0V14.2243Z" fill="white" fill-opacity="0.5" /><path d="M0 26.2028L8.06 26.5009C16.2067 26.8983 32.3267 27.4945 48.7067 23.023C65 18.5515 81.4667 9.01237 97.76 9.11174C114.14 9.31047 130.26 19.2471 146.467 21.7313C162.673 24.2154 178.793 19.2471 195 19.2471C211.207 19.2471 227.327 24.2154 243.707 22.5262C260 20.9363 276.467 12.5896 292.76 6.82632C309.14 1.06307 325.26 -2.31538 341.467 1.858C357.673 6.03139 373.793 17.5579 381.94 23.4205L390 29.1838V58H381.94C373.793 58 357.673 58 341.467 58C325.26 58 309.14 58 292.76 58C276.467 58 260 58 243.707 58C227.327 58 211.207 58 195 58C178.793 58 162.673 58 146.467 58C130.26 58 114.14 58 97.76 58C81.4667 58 65 58 48.7067 58C32.3267 58 16.2067 58 8.06 58H0V26.2028Z" fill="white" fill-opacity="0.7" /><path d="M0 28L8.06 31.8C16.2067 35.7 32.3267 43.3 48.7067 46.8C65 50.3 81.4667 49.7 97.76 46.8C114.14 44 130.26 39 146.467 35.5C162.673 32 178.793 30 195 29.3C211.207 28.7 227.327 29.3 243.707 31C260 32.7 276.467 35.3 292.76 38.3C309.14 41.3 325.26 44.7 341.467 43C357.673 41.3 373.793 34.7 381.94 31.3L390 28V87H381.94C373.793 87 357.673 87 341.467 87C325.26 87 309.14 87 292.76 87C276.467 87 260 87 243.707 87C227.327 87 211.207 87 195 87C178.793 87 162.673 87 146.467 87C130.26 87 114.14 87 97.76 87C81.4667 87 65 87 48.7067 87C32.3267 87 16.2067 87 8.06 87H0V28Z" fill="white" /></svg>');
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: 100%;
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: translateY(-100%);
    width: 100%;
  }

  .weather {
    box-sizing: border-box;
    color: var(--white);
    padding: 7.5rem 3rem;
    position: relative;
    z-index: 50;
  }

  @media (min-width: 40rem) {
    .weather {
      padding: 3rem;
      width: 50%;
    }

    .details {
      left: auto;
      right: 0;
      top: 0;
      width: 50%;
    }

    .details::before {
      transform: translateX(-100%);
      width: 100%;
    }
  }
</style>
