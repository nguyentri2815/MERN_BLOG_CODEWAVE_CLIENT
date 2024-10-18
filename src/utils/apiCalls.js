import axios from 'axios';

export const getGoogleSignUp = async (tokenResponse) => {

    // Lấy access token từ tokenResponse
    const accessToken = tokenResponse.access_token;

    try {
      // Gửi yêu cầu tới Google API để lấy thông tin người dùng
      const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Xử lý thông tin người dùng
      const userInfo = response.data;
      console.log('User Info:', userInfo);
      // Bạn có thể lưu thông tin người dùng vào state hoặc context
      return userInfo;
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }

export const createUser = async (userInfo) => {
    // map data
    const data = {

    }
    try {
        const res = await axios.post('',data);
        
    } catch (error) {
        
    }

}