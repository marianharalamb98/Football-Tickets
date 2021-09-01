const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fs = require('fs');
const bodyParser = require('body-parser')

const app = express();

const port = 6789;

let listaIntrebari;

fs.readFile('intrebari.json', (err, data) => {
	if (err) throw err;
	listaIntrebari = JSON.parse(data);
})


// directorul 'views' va conține fișierele .ejs (html + js executat la server)
app.set('view engine', 'ejs');
// suport pentru layout-uri - implicit fișierul care reprezintă template-ul site-ului este views/layout.ejs
app.use(expressLayouts);
// directorul 'public' va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static('public'))
// corpul mesajului poate fi interpretat ca json; datele de la formular se găsesc în format json în req.body
app.use(bodyParser.json());
// utilizarea unui algoritm de deep parsing care suportă obiecte în obiecte
app.use(bodyParser.urlencoded({ extended: true }));

// la accesarea din browser adresei http://localhost:6789/ se va returna textul 'Hello World'
// proprietățile obiectului Request - req - https://expressjs.com/en/api.html#req
// proprietățile obiectului Response - res - https://expressjs.com/en/api.html#res
app.get('/', (req, res) => res.render('acasa'));


app.get('/acasa', (req, res) => {
	
	res.render('acasa');
});

app.get('/contact', (req, res) => {
	
	res.render('contact');
});

app.get('/galerie', (req, res) => {
	
	res.render('galerie');
});

app.get('/lista', (req, res) => {

	res.render('lista meciuri');
});
app.get('/bilete', (req, res) => {
	
	res.render('bilete');
});
app.get('/disponibilitate', (req, res) => {
	
	res.render('disponibilitate');
});


app.get('/sondaj', (req, res) => {

	res.render('sondaj', { intrebari: listaIntrebari });
});

app.get('/diagrama', (req, res) => {

	res.render('diagrama');
});


app.get('/informatii', (req, res) => {
	
	res.render('informatii');
});
app.get('/vizualizare', (req, res) => {
	
	res.render('vizualizare');
});
app.get('/final', (req, res) => {
	
	res.render('final');
});

app.post('/rezultat-sondaj', (req, res) => {
	res.render('diagrama');
});

app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));