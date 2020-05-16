class State{
    constructor(id,name) {
        this.id = id;
        this.name=name;
        this.counties = {};
        this.parks = {};
    }
    addPark(parkID, parkObj){
        this.parks[parkID] = parkObj;
    }
    addCounty(countyID, countyObj){
        this.counties[countyID] = countyObj;
    }
    removeCounty(countyID){
        if (countyID in this.counties){
            delete this.counties[countyID];
        }
    }

    hasCounties(){
        if(Object.entries(this.counties).length === 0){
            return false;
        }else{
            return true;
        }
        // return (Object.entries(this.counties).length === 0);
    }

    getCountyByID(countyID){
        if (countyID in this.counties){
            return this.counties[countyID];
        }else{
            return null;
        }
    }

    getAllCounties(){
        return this.counties;
    }
    getAllParks(){
        return this.parks;
    }
}
