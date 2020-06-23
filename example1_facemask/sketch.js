/*
ITP Camp 2020: Your Workout Buddy workshop by Yeseul Song
Wear a Mask: the sketch detects a person's face, find ears, and put a yellow mask on their face
ml5 PoseNet https://ml5js.org/reference/api-PoseNet/
*/

let video;
let leftEarX;
let leftEarY;
let rightEarX;
let rightEarY;

function setup() {
  
  createCanvas(600, 400);
  
  video = createCapture(VIDEO);  
  video.hide();
  
  // Create a new poseNet method and apply to video
  poseNet = ml5.poseNet(video, modelLoaded);
  
  // Listen to new 'pose' events and get the coordinates of left ear and right of a face
  poseNet.on('pose', (poses) => {
    //console.log(poses);
    leftEarX = poses[0].pose.keypoints[3].position.x;
    leftEarY = poses[0].pose.keypoints[3].position.y;
    rightEarX = poses[0].pose.keypoints[4].position.x;
    rightEarY = poses[0].pose.keypoints[4].position.y;
  });
  
}

function draw() {
  
  // display the video
  image(video, 0, 0);
  
  // draw a mask
  fill(255, 255, 0, 200);
  noStroke();
  rect(rightEarX, rightEarY, leftEarX-rightEarX, (leftEarX-rightEarX)/2);  
}

// Print out the message when the model is loaded
function modelLoaded() {
  console.log('model loaded!');
}
