const user = { name:"Yuste", friend:"Joseph"};
console.log(user)
function doThing(func) {
    let value = func();
    console.log(value)
}
doThing(user => user.name)