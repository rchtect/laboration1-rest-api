# Laboration1-rest-api

## How to install

npm i

## How to use

npm start

* För att nå api:n bör man befinna sig i localhost:8080/birds.
* För att lägga till en fågel behövs följande: name, age, weight och sex.
* Varje fågel får ett uuid tilldelat till sig efter att den skapats, kolla /birds för en lista av alla skapade.
* För att ta bort/ändra en fågel krävs det att requesten sker till /birds/(tilldelade id).
* För att kolla på en specifik fågel krävs det att man skickar en GET request till /birds/(tilldelade id).

## Kravlista:

* [X] Projektet innehåller minst 4 st. endpoints (GET, POST, PUT & DELETE för en resurs)
* [X] Samtliga endpoints skall kunna nås via en REST Client fil (.rest|.http)
* [X] Datan som API:et hanterar sparas lokalt i serverfilen
* [X] APIét ska svara med 404 om datan saknas.
* [X] Git & GitHub har använts
* [X] Projektmappen innehåller en README.md fil - (läs ovan för mer info)
* [X] Uppgiften lämnas in i tid!
* [X] Ytterligare en GET endpoint skall läggas till där det går att hämta ett specifikt objekt
