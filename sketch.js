//Create variables here
var dog ,happyDog;
var database;
var foodS, foodStock;
var dogImage,hi;

var foodObj;
var fedd, addFood;
function preload()
{
  //load images here
   dogImage = loadImage("images/dogImg.png");
   hi = loadImage("images/dogImg1.png");
   
}

function setup() {
  database= firebase.database();
  createCanvas(800, 700);
  dog = createSprite(400,350,30,30);
  dog.addImage(dogImage);
  dog.scale= 0.5;
foodObj= new Food();
  
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  feed= createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood= createButton("Add Food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() { 
  background(46,139,87) ;

  foodObj.display();
  database.ref("FedTime").on("value", function(data){
    lastFed = data.val()
  })
  

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(hi);
  if(foodObj.getFoodStock() <=0){
    foodObj.updateFoodStock(0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  }
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS = foodS+1;
  database.ref("/").update({Food :foodS});
}