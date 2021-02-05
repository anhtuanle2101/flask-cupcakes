export class Cupcake{ 
    constructor(flavor, size, rating, image){
        this.flavor = flavor;
        this.size = size;
        this.rating = rating;
        this.image = image;
    }

    static baseURL = '/api/cupcakes'

    static async fetchAllCupcakes(){
        console.log(this.baseURL);
        const res = await axios.get(Cupcake.baseURL)
        return res.data.cupcakes;
    }   

    static async createCupcakes(data){
        const res = await axios.post(Cupcake.baseURL, data)
        return res.data.cupcake;
    }

    static async searchCupcakes(term){
        const res = await axios.get(`${Cupcake.baseURL}/search`, {params:{term: term}});
        return res.data.cupcakes;
    }
}