class boat {
  constructor(x, y, w,h,boatposition,animation) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h=h
    this.animation=boatAnimation
    this.boatposition = boatposition
    this.speed=0.05

    var options = {
      restitution: 0.8,
      friction: 1,
      density: 1,
    };

    this.body = Matter.Bodies.rectangle(this.x, this.y, this.w,this.h, options);
    World.add(world, this.body);

    this.Image = loadImage('../C27-Ta-v4--main/assets/boat.png')

   
  }

  animate(){
    this.speed+=0.05
  }
  remove(index){
    this.animation = brokenanimation

    this.speed=0.05
    this.w=300
    this.h=300
    setTimeout(()=>{
      Matter.World.remove(world,boats[index].body)
      boats.splice(index,1)
    },3000)

    
  }

  display() {

    var pos = this.body.position
    var angle = this.body.angle

    var index = floor(this.speed % this.animation.length)
   // console.log('animation index: ', index)

    push()
    translate(pos.x,pos.y)
    rotate(angle)
    imageMode(CENTER)
    image(this.animation[index],0,this.boatposition,this.w,this.h)
    pop()
  }
}
