<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Critique Together</title>

    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">

    <script src="lib/react.js"></script>
    <script src="lib/react-dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  </head>

  <style>
    html {
        font-family: GillSans, Calibri, Trebuchet, sans-serif;
        
        
    }
  </style>

  <body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>

    <div id="navbar"></div>
    <div class="row" style="opacity: 0.85;">
      <div class="container">
        <div class="col s9" id="garage"></div>
      </div>
      <div class="col s3" id="team" style="margin-top: 7%"></div>
    </div>
    <script>
      // MyComponents is a global object where each property is a reference to a component class
      MyComponents = {}
    </script>

    <!-- import each component class in components/ -->

    <script type="text/babel" src="components/navbar.js"></script>
    <script type="text/babel" src="components/team.js"></script>

    <!-- The order is important. Dependencies must be loaded first -->
    <script type="text/babel" src="components/garage-spaces.js"></script>
    <script type="text/babel" src="components/garage-rates.js"></script>
    <script type="text/babel" src="components/garage-hours.js"></script>
    <script type="text/babel" src="components/garage-title.js"></script>
    <script type="text/babel" src="components/garage.js"></script>

    <!-- render react components -->
    <script type="text/babel">

      ReactDOM.render(
        <MyComponents.NavBar/>,
        $('#navbar').get(0)
      );

      var GARAGE_NAME = 'Golden Gateway Garage'

      // data about the team
      var members = [{name: 'Bader', lastname: 'Alshemaimri', github: 'https://github.com/usbader'}, {name: 'Caleb', lastname: 'Hsu', github: 'https://github.com/calebhsu'}, {name: 'Varshini', lastname: 'Jagannath', github: 'https://github.com/varshinij'}, {name: 'Yen-Teh', lastname: 'Liu', github: 'https://github.com/yeli7289'}, {name: 'Kavya', lastname: 'Ravikumar', github: 'https://github.com/kavyaravikumar'}]

      ReactDOM.render(
        <MyComponents.Team members={members}/>,
        $('#team').get(0)
      );

      var garage = {name: 'something'}

      // make a jQuery call to load the garages data
      $.ajax({dataType:'json', url:'garages.snapshot.json'})
        .success(function(garages) {

          console.log('garages:', garages)
          ReactDOM.render(
            <MyComponents.Garage garage={garages[GARAGE_NAME]}/>,
            $('#garage').get(0)
          )
      })

    </script>
  </body>
</html>