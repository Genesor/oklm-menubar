var menubar = require('menubar');
var Menu = require('menu');
var globalShortcut = require('global-shortcut');
var path = require('path');

var mb = menubar({
  dir: __dirname,
  width: 340,
  height: 300,
  frame: false,
  transparent: true,
  resize: false,
});

mb.on('ready', function ready () {
  console.log('app is ready');
  mb.tray.on('right-click', function(){
    mb.hideWindow();
    var contextMenu = Menu.buildFromTemplate([
      { label: 'Play/Pause', click: function() {mb.window.webContents.executeJavaScript("toggle_radio()")} },
      { type: 'separator'},
      { label: 'Quit', click: function() { mb.app.quit() } }
    ]);
    this.popUpContextMenu(contextMenu);
  });

  globalShortcut.register('MediaPlayPause', function() { mb.window.webContents.executeJavaScript("toggle_radio()"); });
});

