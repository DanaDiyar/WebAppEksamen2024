# Dokumentasjon & Planlegging
I dette dokumentet skal vi gå gjennom hvilke typer: 
- *ressurser* som skal brukes
- *verb* som er tilgjengelige
- *statuskoder og data som returneres* 
- *hvilke sider i "app" som skal opprettes og hva som kan gjøres på de ulike sidene* 

### Ressurser

### Verb

### Statuskoder & Data

### Informasjon om "app"
1. Jeg så gjennom all.js filen og flyttet den nederste kodeblokken til en egen fil kalt app.js
2. Flyttet Layout.tsx som var i app inn til Components
3. Lagde filer under Pages folder for de ulike sidene for nettsiden
4. Så at det var en data.js med masse kode som kunne bli delt opp i andre filer i samme mappe for mer ryddig kode. Lagde da filer med de kodene og slettet da data.js filen. Lagde de i TS.
5. Flyttet Courses koden fra all.js inn i egen fil Courses.tsx.
6. Gjorde det samme for Course.
7. Opprettet Lesson.tsx i Course inni Components for å legge til kode fra all.js
8. Jeg fikk ikke til å gå inn på de ulike kursene så jeg prøvde å få hjelp av AI for å vite hvor problemet lå. ble veiledet da til å lage kurs folder inni paged, og inni der lage slugs og courseslugs folders for å inneholde ulike dynamiske routers.
9. Begynne å rydde opp i css, det vil si å gå inn de forskjellige klassene der forskjellige kode kan ha fått navn som egt skal være inne på css inn der istedet. Fikk hjelp av chatgpt på hva noen av kodeblokkene kan hete, og hva det vil si hvis flyttet til css. {/*SRC: kilde: https://chatgpt.com*/} Eksempel: "className="border-l border-slate-200 pl-6" blir til enrollment_aside og den kodeblokken som tidligere var i classname blir lagt inn main.css, der chatgpt hjalp til å forklare hvordan det ville vært på main.css.