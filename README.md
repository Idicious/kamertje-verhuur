# kamertje-verhuur

Once cloned or downloaded run:

`npm install`

There are several commands you can run now. 

The following runs the test suite, the tests can be found in the specs directory:

`npm test`

Builds the js bundle to dist folder:

`npm run build`

Startup a dev server with hot reload on localhost:8080

`npm run start`

`npm run serve` (build + start) 

The entry to the app is in App.ts in the root of the src folder. 
Templates are located in the component directory. Their primary function
is to simply display the data given to them. Any methods used in them 
are to support this. 

In the models directory the main classes of the app can be found. 
The Game class provides methods to add and remove players, start and reset the 
game and determine if victory conditions have been met. 
The Room class represents a single room and provides methods to make walls and
keep track of who completed it.
The Player class does nothing itself but is used by most other classes. 

There are a couple utility classes to help manipulate the DOM as well as enums
and types. 





