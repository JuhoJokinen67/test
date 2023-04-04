# Harjoitustehtävää varten tarvitset

- GitLab tunnuksen ja pääsyn tähän repositorioon
- Red Hat tunnuksen
- Ilmaisen OpenShift developer sandbox ympäristön https://www.redhat.com/en/technologies/cloud-computing/openshift/try-it
    - Ympäristö poistetaan 30 päivän kuluttua, jonka jälkeen voi luoda uuden.
- Reipasta asennetta :)

# Devaaminen omalla koneella
- Asenna koneellesi Maven sekä uusin JDK
- Buildaa ja debuggaa: mvn compile quarkus:dev

# Build pipeline

Rakenna OpenShiftille build pipeline joka hakee koodit tästä repositoriosta ja suorittaa buildin. Halutessasi voit tehdä myös web hookin, joka käynnistää buildauksen automaattisesti aina kun tähän repositorioon tehdään muutoksia. Buildista kannattaa myös tehdä inkrementaalinen, eli uusi buildi käyttää edellisen buildin dependenssit, jolloin buildausaika lyhenee merkittävästi.

![add](/readme/add.jpg)

![import-from-git](/readme/import-from-git.png)

# Harjoitustehtävän kuvaus

![Kartta](/readme/kartta.jpg)

Tehtävä tulee ratkaista käyttämällä Apache Camel integraatiokieltä.

Tehtävän tarkoituksena on rakentaa REST API, joka tuottaa tehtävän mukana tulevan karttasovelluksen(src/main/resources/META-INF/resources/index.html) tarvitsemaa dataa. Karttasovellus olettaa että API vastaa GET kutsuihin osoitteessa: [http://localhost:8080/items](http://localhost:8080/items). API:n  tulee tuottaa data alla olevassa muodossa. Kun kartalla olevaa pistettä klikataan, niin kartalla näytetään nimi sekä selitekenttä. Kartta lähettää myös klikatun itemin POST kutsulla osoitteeseen [http://localhost:8080/item](http://localhost:8080/item). Voit halutessasi lisäksi työntää klikatun pisteen tiedot valitsemaasi pikaviestisovellukseen.

    [{
        "latitude": 60.4827,
        "name": "14",
        "description": "14: Saramäki -> Erikvalla",
        "id": "550018",
        "longitude": 22.31275
    }, {
        "latitude": 60.45902,
        "name": "20",
        "description": "20: Puutori -> Muhkuri",
        "id": "110416",
        "longitude": 22.26783
    }]


- Lähdedata noudetaan osoitteesta: [http://data.foli.fi/siri/vm](http://data.foli.fi/siri/vm)
    - Katso **src/main/resources/application.properties** tiedosto

- Muunnetaan data yllä olevaan muotoon

- Suodatetaan pois objektit, jotka eivät sisällä linjanumeroa tai koordinaattitietoja.

![Arkkitehtuuri](/readme/arkkitehtuuri.jpg)
