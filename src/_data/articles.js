const axios = require('axios');
const markdownIt = require('markdown-it');
const slugify = require('slugify');

async function fetchData(query) {
  const response = await axios.post('url', { query });
  return response.data;
}

module.exports = async function() {
  // Создание запроса:
  const postsData = await fetchData(`query {
    posts {
      id
      title
      content
    }
  }`);

  // Преобразование текста из формата markdown в формат HTML:
  const md = new markdownIt();

  // Создание массива объектов для каждой статьи:
  const posts = postsData.data.posts.map(post => {
    // Преобразование текста из формата markdown в формат HTML:
    const content = md.render(post.content);
    // Очистка описания от HTML тегов и символов переноса строки:
    const description = content.replace(/<[^>]+>/g, '').replace(/\n/g, ' ');

    return {
      title: post.title,
      description: description.slice(0, 200),
      content: content,
      url: `${slugify(post.title.toLowerCase())}.html`,
      tags: ['blog']
    };
  });

  return posts;
};
