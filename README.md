# micro-frontend-login

Stand 20.11.2022:
- Aus dem Projekt micro-frontend-test kopiert
- Ziel: React SSR Erstellen nur mit Node JS
- Offizielle Anleitung um React auf Serverseite zu Rendern -> https://reactjs.org/docs/react-dom-server.html
- ReactDOMServer Bietet hier mehrere Methoden an
- Beispiel: renderToPipeableStream()

Stand 20.11.2022 23Uhr:
- req.on usw. funktioniert nicht hier nicht so richtig
- warum kann ich nicht ermitteln
- mit Wasi HTTP Library geht es aber
- Hier gab es aber auch ein großes Problem:
- Rollup Bundle laut der Config https://wasmedge.org/book/en/write_wasm/js/ssr.html läuft nicht
- Hier musste ich node-builtins plugin entfernen
- Ansonsten kommt es mit diesem Plugin zu wiederholten Abhängigkeiten 