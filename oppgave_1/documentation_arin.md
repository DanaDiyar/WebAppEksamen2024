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