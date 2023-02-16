// Function to change the canvas size
function changeWindowSize(window, width, height) {
  window.canvas.width = width;
  window.canvas.height = height;

  window.renderer.setSize(width, height);
  window.camera.aspect = width / height;
  window.camera.updateProjectionMatrix();
}

function moveWindow(window, left, top) {
  window.canvas.style.left = left + "px";
  window.canvas.style.top = top + "px";
}

let border = button_constant * 0.25;
let window_space_left = button_constant + border;
let window_space_top = top_height + border;

let isRecording = false;

let windows = [viewport, collisions, biem];
let current_window = null;
var side = "";

let mouseMoveHandler = function(event){};

changeWindowSize(viewport, ws_width - border*2, ws_height - border*2);
moveWindow(viewport, window_space_left, window_space_top);
let viewport_btn = document.getElementById("viewport_btn"); // Get the viewport button element
viewport_btn.addEventListener("click", function() { // Add a click event listener to the viewport button
  if (viewport.shown())
    viewport.hide()
  else {
    viewport.show(); // Show the viewport scene
    // Hide the collisions and biem scenes
    collisions.hide();
    biem.hide();
  }
});
viewport_btn.addEventListener("mousedown", function() {
  isRecording = true;

  viewport_btn.style.cursor = "context-menu"
  mouseMoveHandler = function(event) {
    handleMouseMovement(event, viewport);
  };
  document.addEventListener("mousemove", mouseMoveHandler)
});

changeWindowSize(collisions, ws_width - button_constant * 0.5, ws_height - button_constant * 0.5);
moveWindow(collisions, window_space_left, window_space_top);
let collisions_btn = document.getElementById("collisions_btn"); // Get the collisions button element
collisions_btn.addEventListener("click", function() { // Add a click event listener to the viewport button
  if (collisions.shown())
    collisions.hide()
  else {
    collisions.show(); // Show the viewport scene
    // Hide the viewport and biem scenes
    viewport.hide();
    biem.hide();
  }
});
collisions_btn.addEventListener("mousedown", function() {
  isRecording = true;

  collisions_btn.style.cursor = "context-menu"
  mouseMoveHandler = function(event) {
    handleMouseMovement(event, collisions);
  };
  document.addEventListener("mousemove", mouseMoveHandler)
});

changeWindowSize(biem, ws_width - button_constant * 0.5, ws_height - button_constant * 0.5);
moveWindow(biem, window_space_left, window_space_top);
let biem_btn = document.getElementById("biem_btn"); // Get the biem button element
biem_btn.addEventListener("click", function() { // Add a click event listener to the biem button
  if (biem.shown())
    biem.hide()
  else {
    biem.show(); // Show the viewport scene
    // Hide the viewport and collisions scenes
    viewport.hide();
    collisions.hide();
  }
});
biem_btn.addEventListener("mousedown", function() {
  isRecording = true;

  biem_btn.style.cursor = "context-menu"
  mouseMoveHandler = function(event) {
    handleMouseMovement(event, biem);
  };
  document.addEventListener("mousemove", mouseMoveHandler)
});

document.addEventListener("mouseup", function(){
  if (isRecording){
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.body.style.cursor = "default"
    viewport_btn.style.cursor = "default"
    collisions_btn.style.cursor = "default"
    biem_btn.style.cursor = "default"

    current_window.canvas.style.zIndex=0;
    if (side=="left"){
      if (viewport.shown()&&viewport.side=="left") {viewport.side=""; viewport.hide;}
      if (collisions.shown()&&collisions.side=="left") {collisions.side=""; collisions.hide;}
      if (biem.shown()&&biem.side=="left") {biem.side=""; biem.hide;}
    }
    if (side=="right"){
      if (viewport.shown()&&viewport.side=="right") {viewport.side=""; viewport.hide;}
      if (collisions.shown()&&collisions.side=="right") {collisions.side=""; collisions.hide;}
      if (biem.shown()&&biem.side=="right") {biem.side=""; biem.hide;}
    }

    current_window.side=side; 
  }
});

function findWindow(){
  windows.forEach(function(element) {
    if (element.shown()) return element;
  });
}

function handleMouseMovement(event, window){
  document.body.style.cursor = "context-menu";
  window.canvas.style.zIndex=1;
  if (event.clientX < button_constant + ws_width/2){
    side = "left";
    current_window = findWindow();
    window.show();
    
    moveWindow(current_window, button_constant+ws_width/2+border*0.5, top_height+border);
    changeWindowSize(current_window, ws_width/2-border*1.5, ws_height-border*2);
    
    moveWindow(window, button_constant+border, top_height+border);
    changeWindowSize(window, ws_width/2-border*1.5, ws_height-border*2);
  }
  else if (event.clientX > button_constant + ws_width/2){
    side = "right";
    current_window = findWindow();
    window.show();

    moveWindow(current_window, button_constant+border, top_height+border);
    changeWindowSize(current_window, ws_width/2-border*1.5, ws_height-border*2);
    
    moveWindow(window, button_constant+ws_width/2+border*0.5, top_height+border);
    changeWindowSize(window, ws_width/2-border*1.5, ws_height-border*2);
  }
}