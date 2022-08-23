let path = require('path')
let conn = require('./db');

module.exports = {
    getMenus() {
        return new Promise((resolve, reject) => {

            conn.query("SELECT * FROM tb_menus ORDER BY title", (err, results) => {

                if (err) {
                    reject(err);
                }

                resolve(results);

            })

        });
    },

    save(fields, files) {
        return new Promise((resolve, reject) => {

            fields.photo = `images/${path.parse(files.photo.filepath).base}`

            conn.query(`INSERT INTO tb_menus (title, description, price, photo) VALUES(?,?,?,?)`, [
                fields.title,
                fields.description,
                fields.price,
                fields.photo
            ], (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });

        });
    }
}