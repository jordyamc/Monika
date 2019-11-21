let BlankMap = new WeakMap();

class Demo {
  constructor ( vida = 100 ) {
    BlankMap.set( this, {
      vida: vida
    } );
  }

  set publicVida ( value ) {
    BlankMap.get( this ).vida = value;
  }

  get vida () {
    return BlankMap.get( this ).vida;
  }
}


let playerOne = new Demo;

// We can not change 'private' properties
playerOne.vida = 50;
playerOne.vida; //100

// We need the public setter:
playerOne.publicVida = 20;
playerOne.vida;

console.log(playerOne.vida);