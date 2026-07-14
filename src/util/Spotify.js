const clientId = '90c35a433ae4400695fe0d59efdc7ba8';
const redirectUri = 'http://127.0.0.1:5173/';

let accessToken;

const Spotify = {
    generateRandomString(length) {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    },

    async sha256(plain) {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    },

    base64encode(input) {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    },
    async getAccessToken() {
    // 1. 如果内存里已经有，直接返回
    if (accessToken) return accessToken;

    // 2. 检查网址里有没有 Spotify 返回的 code (注意现在是 ?code= 而不是 #access_token=)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      // 场景 A：没有 code，必须跳转去 Spotify 大门
      const codeVerifier = this.generateRandomString(64);
      window.localStorage.setItem('code_verifier', codeVerifier); // 记在浏览器缓存里
      
      const hashed = await this.sha256(codeVerifier);
      const codeChallenge = this.base64encode(hashed);

      const authUrl = new URL("https://accounts.spotify.com/authorize");
      authUrl.search = new URLSearchParams({
        response_type: 'code', // 听官方的话，改成了 code
        client_id: clientId,
        scope: 'playlist-modify-public',
        code_challenge_method: 'S256', // 告诉大爷我用了最牛的 S256 加密
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
      }).toString();

      window.location.href = authUrl.toString(); // 强行跳转
    } else {
      // 场景 B：用户授权完了，带着 code 被传回来了
      const codeVerifier = window.localStorage.getItem('code_verifier');
      
      // 用 code 向 Spotify 发送 POST 请求，换取真正的通行证
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier, // 对暗号
        })
      });
      
      const data = await response.json();
      accessToken = data.access_token; // 终于拿到真正的令牌了！
      
      // 设定闹钟，到期销毁
      window.setTimeout(() => accessToken = '', data.expires_in * 1000);
      
      // 抹掉地址栏里的 ?code=... 痕迹，保持页面整洁
      window.history.pushState('Access Token', null, '/'); 
      
      return accessToken;
    }
  },

  // === search 方法也需要微调 ===
  async search(term) {
    // 【重要】：因为 getAccessToken 里面用了 fetch，变成了异步，这里必须加 await 等它！
    const currentToken = await Spotify.getAccessToken();
    
    // 如果刚刚发生了网页跳转，强制截断后面的代码，防止报错
    if (!currentToken) return [];

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { 
        headers: { Authorization: `Bearer ${currentToken}`}
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) return [];

        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            cover: track.album.images[2].url,
            uri: track.uri
        }));
      }
    } catch (error) {
      console.log("搜索发生错误:", error);
    }
  }
};

export default Spotify;
    // getAccessToken() {
    //     if (accessToken) {
    //         return accessToken;
    //     } else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
    //         const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    //         const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    //         accessToken = accessTokenMatch[1];
    //         // 从数组拿出来的默认是字符串，所以要转成数字
    //         const expiresIn = Number(expiresInMatch[1]);
    //         window.setTimeout(() => accessToken = '', expiresIn * 1000);
    //         window.history.pushState('Access Token', null, '/');
    //         return accessToken;
    //     } else {
    //         window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    //     }
    // },

    // async search(term) {
    //     const accessToken = Spotify.getAccessToken();
    //     try {
    //         const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    //         if (response.ok) {
    //             const jsonResponse = await response.json();
    //             const tracks = jsonResponse.tracks.items.map(track => {
    //                 return {
    //                     id: track.id,
    //                     name: track.name,
    //                     artist: track.artists[0].name,
    //                     album: track.album.name,
    //                     cover: track.album.images[2].url,
    //                     uri: track.uri
    //                 }
    //             });
    //             return tracks;
    //         }
    //     } catch (error) {
    //         console.log('搜索过程 错误如下：', error);
    //     }
    // }
