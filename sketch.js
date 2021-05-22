var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var feed,lastfed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
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

  feed=createButton("feed dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  function readStock(data){
    feedtimeS=data.val();
    hour()
  }
  
 
  lastfed.text("lastfed"+feedtime,500,95)

 
  drawSprites();
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}



function feedDog(){
  dog.addImage(happyDog);
  foodS--;
  readStock(data)
  database.ref('/').update({
    Food:foodS
  })
  feedtime++;
  database.ref('/').update({
    Feedtime:feedtimeS
  })
  


}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
