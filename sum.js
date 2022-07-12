
function sum(a, b) {
  make_meal("dinner", function instructions() {
    console.log("step 1")
    console.log("step 2")
    console.log("step 3")
  } )
  make_meal ("breakfast", function instructions(amount) {
    console.log("chop garlic, onions, veggies of choice and sautee everything")
    console.log("fry " + amount + " eggs")
    console.log("season with salt, pepper and herb mix of choice")
    console.log("toast bread, use spread of choice")
  }, 4)
  return a + b;
}

















function make_meal(meal, recipe, servings) {
  console.log("I am making " + meal)
  console.log("retrive ingredients") 
  recipe(servings) 
  console.log("clean up")
}
module.exports = sum;

