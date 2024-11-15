# Dokumentasjon & Planlegging
I dette dokumentet skal vi gå gjennom hvilke typer: 
- *ressurser* som skal brukes
- *verb* som er tilgjengelige
- *statuskoder og data som returneres* 
- *hvilke sider i "app" som skal opprettes og hva som kan gjøres på de ulike sidene* 

###  API-endepunkter
Vi har i denne oppgaven definert flere API-endepunkter for ulike ressurser som Users (dummy data fra data.js), Courses, Lessons og Comments, som kunden har ønsket seg.
###   HTTP-Verb
Vi har implementert CRUD-operasjoner for de ulike ressursene. Dette er forespørslene som skal håndteres:
- Courses:
    - GET: Henter en liste over alle kurs
    - POST: Oppretter et nytt kust
    - DELETE: Sletter et spesifikt kurs
- Lessons: 
    - GET: Henter en liste over alle leksjoner
- Comments:
    - GET: Henter en liste over alle kommentarer
###   Statuskoder & respons
Når vi forventer data eller respons fra serverene, forventer vi det i JSON-form. Statuskodene som returneres når det går riktig eller galt:
- "200 OK" for vellykket operasjon
- "404 Not Found" der en ressurs ikke finnes eller eksisterer
- "400 Bad Request" for ugyldige forespørsler

Vår respons på de forskjellige API-endepunktene (Tar med bare 2 fra hver):
- Users:
    - [
  {
    "id": 1,
    "username": "Ole Hansen",
    "email": "ole@email.no"
  },
  {
    "id": 2,
    "username": "Sara Olsen",
    "email": "sara@email.no"
  }
]
- Courses:
    - [
  {
    "id": "1",
    "title": "JavaScript 101",
    "slug": "javascript-101",
    "description": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore",
    "category": "code"
  },
  {
    "id": "2",
    "title": "Python 101",
    "slug": "python-101",
    "description": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore",
    "category": "code"
  }
    ]
- Lessons:
    - [
  {
    "id": "1",
    "course_id": "1",
    "title": "Variabler",
    "slug": "variabler",
    "description": "Lorem ipsum dolor sit amet.",
    "text": "Lorem ipsum dolor sit amet."
  },
  {
    "id": "2",
    "course_id": "1",
    "title": "Løkker",
    "slug": "lokker",
    "description": "Lorem ipsum dolor sit amet.",
    "text": ""
  }
    ]
- Comments:
    - [
  {
    "id": "1",
    "lesson_slug": "variabler",
    "created_by": "Sara Olsen",
    "comment": "Lorem ipsum dolor sit amet."
  },
  {
    "id": "2",
    "lesson_slug": "variabler",
    "created_by": "Finn Finnsen",
    "comment": "Lorem ipsum dolor sit amet."
  }
]
###   Sider i applikasjonen - Frontend??
