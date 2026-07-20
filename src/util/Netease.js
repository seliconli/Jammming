const Netease = {
//   baseUrl: 'http://127.0.0.1:3000',
  baseUrl: `http://${window.location.hostname}:3000`,

  async search(term) {
    if (!term) return [];

    try {
      // 1. 发起基础搜索请求
      const response = await fetch(`${this.baseUrl}/search?keywords=${term}`);
      if (!response.ok) return [];
      const jsonResponse = await response.json();
      
      if (!jsonResponse.result || !jsonResponse.result.songs) {
        return [];
      }
      const songs = jsonResponse.result.songs;

      // 2. 提取所有搜到歌曲的 ID，用逗号拼成一串 (例如 "123,456,789")
      const ids = songs.map(track => track.id).join(',');

      // 3. 核心升级：批量请求高质量音频链接！
      // level 参数说明：standard(标准), higher(较高), exhigh(极高/320k), lossless(无损), hires(Hi-Res)
      const urlResponse = await fetch(`${this.baseUrl}/song/url/v1?id=${ids}&level=exhigh`);
      const urlJson = await urlResponse.json();

      // 创建一个字典映射，方便把获取到的链接与对应歌曲的 ID 对号入座
      const urlMap = {};
      if (urlJson.data) {
        urlJson.data.forEach(item => {
          urlMap[item.id] = item.url; 
        });
      }

      // 4. 数据清洗与组装
      return songs.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          cover: 'https://via.placeholder.com/64x64.png?text=Music', 
          uri: `netease:track:${track.id}`,
          // 优先使用查到的高清真实链接，如果没查到（可能是没有版权），用魔法链接兜底
          preview: urlMap[track.id] || `https://music.163.com/song/media/outer/url?id=${track.id}.mp3`
        };
      });
    } catch (error) {
      console.log("网易云搜索发生错误:", error);
    }
  }
};

export default Netease;