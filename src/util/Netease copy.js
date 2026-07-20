const Netease = {
  // 网易云 API 跑在 3000 端口
  baseUrl: 'http://127.0.0.1:3000',

  async search(term) {
    if (!term) return [];

    try {
      // 1. 发起请求（注意：网易云搜索的参数叫 keywords）
      const response = await fetch(`${this.baseUrl}/search?keywords=${term}`);
      
      if (response.ok) {
        const jsonResponse = await response.json();
        
        // 2. 安全防护：网易云没搜到东西时返回结果可能为空
        if (!jsonResponse.result || !jsonResponse.result.songs) {
          return [];
        }

        // 3. 数据清洗与映射（完全适配你之前写的 Track.jsx 组件）
        return jsonResponse.result.songs.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            // 注意：网易云的普通搜索接口不直接返回高清封面，你可以先用占位图，或者留空
            cover: 'https://via.placeholder.com/64x64.png?text=Music', 
            uri: `netease:track:${track.id}` // 伪造一个 uri 保持数据结构统一
          };
        });
      }
    } catch (error) {
      console.log("网易云搜索发生错误:", error);
    }
  }
};

export default Netease;