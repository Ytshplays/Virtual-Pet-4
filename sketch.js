var dog,sadDog,happyDog, database;
var foodS,foodStock;
var washroom;
var garden;
var lazy
var letsPLAY;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed

function preload(){
sadDog=loadImage("images/dogImg.png");
happyDog=loadImage("images/dogImg1.png");
washroom=loadImage("images/washroom.png");
letsPLAY=loadImage("images/Living Room.png");
garden=loadImage("images/Garden.png");
lazy=loadImage("images/Bed Room.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  takebath=createButton("I want to take bath");
  takebath.position(580,95);
  takebath.mousePressed(takeBath)

  letsplay=createButton("Lets Play!");
  letsplay.position(510,95);
  letsplay.mousePressed(letsPlay)

  letsPlayIn=createButton("Lets Play In Park!");
  letsPlayIn.position(870,95);
  letsPlayIn.mousePressed(letsPlayInPark)

  sleepy=createButton("I am very sleepy");
  sleepy.position(980,95);
  sleepy.mousePressed(iamSleepy)
}

function draw() {
 
  foodObj.display();

  //write code to read fedtime value from the database 
 
  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
lastFed=data.val()
  })
  
 
  //write code to display text lastFed time here

  fill(255,255,255)

  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12+"PM",350,30)
  }else if(lastFed==0){
    text("Last Feed: 12 AM",350,30)
  }else{
    text("Last Feed: "+ lastFed+"AM",350,30)
  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val * 0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
      FeedTime:hour()
    
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function takeBath (){
  background(washroom);
}

function letsPlay () {
  background(letsPLAY);
}

function letsPlayInPark () {
  background(garden);
}

function iamSleepy () {
  background(lazy);
}