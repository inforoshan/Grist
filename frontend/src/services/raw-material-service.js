import axios from "axios";

import authHeader from './auth-header';

const API_URL = 'http://localhost:9192/api/rawmaterial/';

class RawMaterials {

    upload(file) {

        let fromData = new FormData();

        fromData.append("path", file);

        return axios.put(API_URL + 'upload', fromData, {
            headers: authHeader()
        });
    }

    registerData(data) {
        console.log("Raw Data ::: ", data);
        axios.post(API_URL, data, {headers: authHeader()}).then((response) => {
            return response.data;
        });
    }

    getRawDataById(customerId) {
        return axios.get(API_URL + "getRawMaterialsByCustomerId", {
            headers: authHeader(),
            params: {customerId: customerId}
        });
    }

    edit(data) {
        return axios.put(API_URL + 'update', data, {headers: authHeader()});
    }

    delete(rawId) {
        return axios.delete(API_URL + 'deleteData', {
            headers: authHeader(),
            params: {id: rawId}
        });
    }

    getByRawId(rawId) {
        return axios.get(API_URL + 'getRawDataById', {
            headers: authHeader(),
            params: {id: rawId}
        })
    }

    getRawData(page, size) {
        return axios.get(API_URL + 'getRawMaterials', {
            headers: authHeader(),
            params: {page: page, size: size}
        })
    }

    getRawDataByNameAndRating(name, rating, page, size) {
        return axios.get(API_URL + 'getRawMaterialsByNameAndRating', {
            headers: authHeader(),
            params: {name: name, rating: rating, page: page, size: size}
        })
    }

    getRawDataByName(name, page, size){
        return axios.get(API_URL + 'getRawMaterialsByName', {
            headers: authHeader(),
            params: {page: page, size: size}
        })
    }

    getRawDataByRawId(rawId) {
        return axios.get(API_URL + 'getRawDataById', {
            headers: authHeader(),
            params: {id: rawId}
        });
    }

    getRawMaterials() {
        return axios.get(API_URL + 'getAllRawMaterials',{headers: authHeader()})
    }
}

export default new RawMaterials();