Toelichting project
------------------------------------------------------
Server
De opbouw van de applicatie is dat de controller de http calls ontvangt en deze op de juiste manier verwerkt en doorgeeft aan de repository.
De repository bevat momenteel de logica en praat met de database. Echter zou de logica in een aparte service geplaatst moeten worden zodat deze ook getest kan worden.
Tijdens onze trainingen en oefencase weken hebben we nooit dit patroon moeten toepassen waardoor het niet is gelukt om deze service te bouwen in de tijd die we voor deze 
opdracht hadden. 

Client
Aan de client kant is er een service gemaakt die de file leest. De service geeft een observable terug waardoor het mogelijk is om naast de data ook een error mee terug
te sturen. In deze observable zit de filereader, in deze filereader worden de methodes aangeroepen die de file controleren. Deze methodes worden vervolgens getest in 
de spec file van de ReadFileService.
