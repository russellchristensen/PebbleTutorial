var UI = require('ui');
//var ajax = require('ajax');

var configuration = {
  root: {
    url: "192.168.1.1",
    pages: [
      {    
        id: 1,
        title: "Home",
        controls:[
          {
            id: 1,
            title: "System Status"
          }
        ]
      },
      {
        id: 2,
        title: "Living Room",
        controls:[
          { id: 1, title: "Play" },
          { id: 2, title: "Pause" },
          { id: 3, title: "FF" },
          { id: 4, title: "RW" }
        ]
      }
    ]
  }
};

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Home Control',
  subtitle:'Loading...'
  
  
});

// Display the Card
card.show();
card.hide();
var mainMenu = new UI.Menu({
  sections: [{
    title:'Pages',
    items:configuration.root.pages
  }]
});

var currentMenu = configuration.root.pages;

var menuEvent = function(event) {
  console.log("event.item: " + JSON.stringify(event.item));
  var selectedPage = event.item;
  if (selectedPage.controls) {
    if (selectedPage.controls.length > 1) {
      currentMenu = selectedPage.controls;
      var detailMenu = new UI.Menu({
        sections: [{
          title: selectedPage.title,
          items: currentMenu
        }]
      });
      detailMenu.on('select', menuEvent);
      
      detailMenu.show();
    } else if (selectedPage.controls.length == 1) {
      var onlyControl = selectedPage.controls[0];
      
      var detailCard = new UI.Card({
        title: onlyControl.title,
        body: 'Page Id: ' + onlyControl.id
      });
      detailCard.show();    
    }
  } else {
      
    // Send a string to Pebble
    Pebble.sendAppMessage({'KEY_COMMAND': 'command'},
      function(e) {
        console.log('Send successful.');
      },
      function(e) {
        console.log('Send failed!');
      }
    );
  }
};

mainMenu.on('select', menuEvent);

mainMenu.show();