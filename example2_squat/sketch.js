/* 

ITP Camp 2020: Your Workout Buddy workshop by Yeseul Song

Squat Motivator

The sketch uses PoseNet to decide if you do a squat (by measuring distances between your hip and knee) and counts the number of squats. Whenever you succeed, a sound file will play. When you do 5 squats, 

PoseNet https://ml5js.org/reference/api-PoseNet/

*/

let video;
let rightHipX = 0;
let rightHipY = 0;
let rightKneeX = 0;
let rightKneeY = 0;
let counter = 0;
let d_prev = 0;

function preload() {
  soundFormats('wav');
  mySound = loadSound('cheer.wav');
}

function setup() {
  createCanvas(600, 400);
  video = createCapture(VIDEO);
  video.hide();
  
  // Create a new poseNet method and apply to video
  poseNet = ml5.poseNet(video, modelLoaded);

  // Listen to new 'pose' events and get the coordinates of left hip and left knee of a pose
  poseNet.on('pose', (poses) => {
    //console.log(poses);    
    rightHipX = poses[0].pose.keypoints[12].position.x;
    rightHipY = poses[0].pose.keypoints[12].position.y;
    rightKneeX = poses[0].pose.keypoints[14].position.x;
    rightKneeY = poses[0].pose.keypoints[14].position.y;    
  });
  
}

// Print out the message When the model is loaded
function modelLoaded() {
  console.log('model is ready!');
}

function draw() {
  
  // draw video
  image(video, 0, 0);  
  
  // calculate the distance between left hip and left knee
  let d = dist(rightHipX, rightHipY, rightKneeX, rightKneeY);
    
  // visualize the distance with an ellipse. change the color of the ellipse when you reach at the lowest (enough) position for each squat
  noFill();
  if (d < 100) {
    stroke (0, 255, 0);
  } else {
    stroke (255, 0, 0);
  }
  ellipse(rightHipX, rightHipY, d);
  
  // if a squat is detected (when someone sits down, and up), increase the counter by 1
  if (d < 100 && d_prev >=100) {   
    counter ++;    
    mySound.play();
  }
  
  // if the counter reaches at 5, display "You did it" otherwise "keep going!"
  textSize(50);
  fill(255);
  if (counter >= 5) { 
    text("You did it!", 100, 100)
    
  } else {
    text("Keep going!", 100, 100)    
  }
  
  // console.log(counter);
  // console.log(d);
  
  // save the current d to prev_d for comparison
  d_prev = d; 
  
}

