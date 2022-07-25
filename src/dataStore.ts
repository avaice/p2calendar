interface DataStoreType{key : string, title : string, text : string};

class DataStore{

    static GetAll(){
        let data_arr = [];
        const data = localStorage.getItem("p2cale2_data");
        if(data){
            data_arr = JSON.parse(data);
        }
        return data_arr;
    }

    static Get(key : string){
        const data_arr = this.GetAll();
        if(data_arr.length == 0)return null;
        const getResult = data_arr.find((v : DataStoreType) => v.key === key);
        if(getResult){
            return getResult;
        }else{
            return null;
        }
    }

    static Set(data : DataStoreType){
        const data_arr = this.GetAll();
        const index = data_arr.length  > 0 ? data_arr.findIndex((v : DataStoreType) => v.key == data.key) : -1;
        if(index >= 0){
            
            data_arr[index].title = data.title;
            data_arr[index].text = data.text;
        }else{
            data_arr.push({
                key : data.key,
                title : data.title,
                text : data.text
            });
        }
        localStorage.setItem("p2cale2_data", JSON.stringify(data_arr));
    }

    static Delete(key : string){
        const data_arr = this.GetAll();
        const index = data_arr.length  > 0 ? data_arr.findIndex((v : DataStoreType) => v.key == key) : -1;
        if(index >= 0){
            data_arr.splice(index, 1);
        }
        localStorage.setItem("p2cale2_data", JSON.stringify(data_arr));
    }

}

export default DataStore;