import axios from "axios";

import authHeader from './auth-header';

const API_URL = 'http://localhost:9192/api/feedback/';

class FeedbackService {

    feedback(feedbackData) {
        return axios.post(API_URL + 'feedback', feedbackData, {headers: authHeader()});
    }

    rating(supplierId) {
        return axios.get(API_URL + 'feedback-rating', {
            headers: authHeader(),
            params: {supplierId: supplierId}
        });
    }

    getOrderLineByRawId(page, size, supplierId) {
        return axios.get(API_URL + 'feedback-by-supplier', {
            headers: authHeader(),
            params: {supplierId: supplierId, page: page, size: size}
        })
    }
}

export default new FeedbackService()