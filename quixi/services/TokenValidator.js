import axios from 'axios';
import {USER_ROUTES} from "../assets/constants/routes";
import * as SecureStore from "expo-secure-store";

exports.validateToken = async (token) => {

        let config = {
            method: 'get',
            url: USER_ROUTES.VALIDATE,
            headers: {
                'Authorization': `Bearer ${token}`}
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                return true
            })
            .catch(function (error) {
                console.log(error.response.data);
                return false;
            });
};

exports.getToken = async () => {
    return SecureStore.getItemAsync('token');
}