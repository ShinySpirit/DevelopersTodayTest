To run this application you have to do next steps:

  1. Enter folder "backend" and run "npm install"
  2. You need postgres database running, application coud connect to. If you have Docker installed, you can open command prompt and pass there next command, replacing necessary values like POSTGRES_PASSWORD with your own:
    docker run --name postgres-container -e POSTGRES_DB=postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=567890 -p 5432:5432 -d postgres
  3. Edit .env file in folder "backend" if you want: 
    DB_NAME - Postgres database name
    DB_USER - Postgress database user
    DB_PASSWORD - Postgress password
    DB_HOST - Postgress host (ip-address or localhost for same machine)
    DB_PORT - Postgress port

  3. Enter the "backend" directory with command prompt and run command "npm run start:prod", if you made all correct, application will be avaliable on port 3000 of your IP-adress (or localhost, from same machine).

  Endpoints: 
    
    POST /users
    Creates a new user. Expected body: 
      {
        "username": "TEST"
      }
    
    GET /users
    Returns all users with their IDs. Expected response: 
    [
      {
          "id": 2,
          "username": "TEST",
          "holidays": null
      },
      {
          "id": 3,
          "username": "TEST1",
          "holidays": null
      },
      {
          "id": 4,
          "username": "TEST2",
          "holidays": null
      }
    ]
    
    GET /countrys
    Returns all avaliable countrys. Expected response:
    [
      {
          "countryCode": "AD",
          "name": "Andorra"
      },
      {
          "countryCode": "AL",
          "name": "Albania"
      },
      ...
    ]

    GET /countrys/info/:code
    Returns info by specified country. :code is iso2 code (UA, US, BR). Expected response: 
    {
      "name": "Federative Republic of Brazil",
      "borders": [
          {
              "commonName": "Argentina",
              "officialName": "Argentine Republic",
              "countryCode": "AR",
              "region": "Americas",
              "borders": null
          },
          ...
      ],
      "population": [
          {
              "year": 1960,
              "value": 72179226
          },
          ...
      ],
      "flagURL": "https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg"
    }

    POST /users/:id/calendar/holidays
    Creates a new holiday in specified user's calendar (:id is user's ID). Expected body:
    {
      "countryCode": "UA",
      "year": 2022,
      "holidays": ["TEST HOLIDAY1", "TEST HOLIDAY2"]
    }
    If specify same info expect holidays, new holidays will be appended.

    GET /users/:id/calendar/holidays
    Returns all holidays in specified user's calendar (:id is user's ID). Expected response:
    [
      {
        "id": 7,
        "user": 4,
        "countryCode": "UA",
        "year": 2022,
        "holidays": [
            "New Year's Day"
        ]
      }
    ]
    Only valid holidays will be passed, reffered to Public Holidays API.