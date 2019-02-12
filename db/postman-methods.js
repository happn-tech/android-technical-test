const host = pm.globals.get('host');
const port = pm.globals.get('port');

const interval = setTimeout(() => { }, 2147483647);


function getArticles() {
    return new Promise(function (resolve, reject) {
        pm.sendRequest('http://' + host + ':' + port + '/articles', function (err, response) {
            const articles = response.json();
            if (articles.length !== 0) {
                resolve(articles);
            } else {
                reject(new Error('There is no article'))
            }
        });
    })
}

function getFirstArticle(articles) {
    return new Promise(function (resolve, reject) {
        resolve(articles[0]);
    });
}

function addFavorite(article) {
    const request = {
        url: 'http://' + host + ':' + port + '/favorites',
        method: 'POST',
        body: {
            mode: 'urlencoded',
            urlencoded: [{ key: 'article_id', value: article._id }]
        }
    }
    return new Promise(function (resolve, reject) {
        pm.sendRequest(request, function (err, response) {
            if (err) reject(err);
            else resolve(response);
        });
    })
}
function setFavoriteId(favorite){
    const request = {
        url: 'http://' + host + ':' + port + '/favorites',
        method: 'DELETE',
        body: {
            mode: 'urlencoded',
            urlencoded: [{ key: 'article_id', value: article._id }]
        }
    }
}

//Example
getArticles()
    .then((v) => { return getFirstArticle(v); })
    .then((article) => { return addFavorite(article); })
    .then(() => clearTimeout(interval))
