console.log("parks?");
class Park{
    constructor(id) {
        this.id = id;
        this.layer=null;
        this.coord;
    }
    setParkCoord(){}

    setParkLayer(layer){
        this.layer= layer;
    }



    getParkLayer(){
        return this.layer;
    }

}
