

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const app = express();
app.use(cors());
app.use(bodyParser.json());
const { check, validationResult } = require('express-validator');
let connection;
let id;


const bcrypt = require('bcryptjs'); // npm i bcryptjs
let salt = bcrypt.genSaltSync(10);
// check hash password
// bcrypt.compareSync(password, hashPassword);




async function run() {
	try {
		connection = await oracledb.getConnection({
			user: "cvtheque",
			password: "123",
			connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST =localhost)(PORT = 1521))(CONNECT_DATA =(SERVER = DEDICATED)(SERVICE_NAME = XE)))"
		})
		console.log("Connected .....")
		return connection;


	} catch (err) {
		console.error(err);
	}
}

run();



async function getTables(table, tableid1, rule1, tableid2, rule2) {
	connection = await run();
	let sqlReq;
	if (rule1 == null && tableid1 == null && rule2 == null && tableid2 == null) {
		sqlReq = "SELECT * FROM " + table;
	} else if (rule2 == null && tableid2 == null) {
		if (tableid1 == 'email') {
			sqlReq = "SELECT * FROM " + table + " where " + tableid1 + "='" + rule1 + "'";
		} else {
			sqlReq = "SELECT * FROM " + table + " where " + tableid1 + "=" + rule1;
		}

	} else {
		sqlReq = "SELECT * FROM " + table + " where " + tableid1 + "='" + rule1 + "' and " + tableid2 + "='" + rule2 + "'";
	}
	const result = await connection.execute(sqlReq);
	return result;
}

async function getCandidatPostulerByOffre(value) {
	connection = await run();
	let sqlReq = "select idcandidat from postuler where idoffre=" + value;
	const result = await connection.execute(sqlReq);
	return result;
}

async function getCandidatByList(values) {
	/*let list=values.split(",");
	let lastValues="";
	if(list.length==1){
		lastValues=list[0];
	}else{
		for(let i=0; i<list.length; i++) {
			lastValues=list[0]+",";
		}
		lastValues.slice(0,-1)
	}*/

	let sqlReq;
	sqlReq = "SELECT * FROM candidats where idcandidat in (" + values + ")";  //lastValues
	const result = await connection.execute(sqlReq);
	return result;
}

async function getNumbreOfPostulation() {
	connection = await run();
	let sqlReq = "select count(*) as nbrCandidat from postuler";
	const result = await connection.execute(sqlReq);
	return result;
}





/////////       GET ALL DATA

app.get('/account', async function (req, res) {
	console.log("get account");
	const resultat = (await getTables("account", null, null, null, null)).rows;
	if (resultat.length > 0) {
		res.send({
			message: "ALL account data",
			data: resultat
		});
	} else {
		res.send({
			message: "account data not found",
		});
	}
})

app.get('/candidats', async function (req, res) {
	console.log("get candidats");
	const resultat = (await getTables("candidats", null, null, null, null)).rows;
	if (resultat.length > 0) {
		res.send({
			message: "ALL candidats data",
			data: resultat
		});
	} else {
		res.send({
			message: "candidats data not found",
		});
	}
})

app.get('/formations', async function (req, res) {
	console.log("get formations");
	const resultat = (await getTables("formations", null, null, null, null)).rows;
	if (resultat.length > 0) {
		res.send({
			message: "ALL formations data",
			data: resultat
		});
	} else {
		res.send({
			message: "formations data not found",
		});
	}
})

app.get('/experiences', async function (req, res) {
	console.log("get experiences");
	const resultat = (await getTables("experiences", null, null, null, null)).rows;
	if (resultat.length > 0) {
		res.send({
			message: "ALL experiences data",
			data: resultat
		});
	} else {
		res.send({
			message: "experiences data not found",
		});
	}
})

app.get('/centreinterets', async function (req, res) {
	console.log("get centreinterets");
	const resultat = (await getTables("centreinterets", null, null, null, null)).rows;
	if (resultat.length > 0) {
		res.send({
			message: "ALL centreinterets data",
			data: resultat
		});
	} else {
		res.send({
			message: "centreinterets data not found",
		});
	}
})

app.get('/specialites', async function (req, res) {
	console.log("get specialites");
	const resultat = (await getTables("specialites", null, null, null, null)).rows;
	if (resultat.length > 0) {
		res.send({
			message: "ALL specialites data",
			data: resultat
		});
	} else {
		res.send({
			message: "specialites data not found",
		});
	}
})

app.get('/langues', async function (req, res) {
	console.log("get langues");
	const resultat = (await getTables("langues", null, null, null, null)).rows;
	if (resultat.length > 0) {
		res.send({
			message: "ALL langues data",
			data: resultat
		});
	} else {
		res.send({
			message: "langues data not found",
		});
	}
})

app.get('/offre', async function (req, res) {
	console.log("get offre");
	const resultat = (await getTables("offre", null, null, null, null)).rows;
	if (resultat.length > 0) {
		res.send({
			message: "ALL offre data",
			data: resultat
		});
	} else {
		res.send({
			message: "offre data not found",
		});
	}
})



app.get('/postuler', async function (req, res) {
	console.log("get postuler");

	const resultat = (await getTables("postuler", null, null, null, null)).rows;
	
	if (resultat.length > 0) {
		res.send({
			message: "ALL postuler data",
			data: resultat
		});
	} else {
		res.send({
			message: "postuler data not found",
		});
	}
})






///////////////
///////////////       GET SINGLE DATA
///////////////

app.post('/account/login', async function (req, res) {
	console.log(req.body.EMAIL + " account data");
	var resultat = (await getTables("account", "email", req.body.EMAIL, null, null)).rows;
	console.log(resultat);
	if (resultat.length > 0) {
		const match = await bcrypt.compare(req.body.PASSWORD, resultat[0].PASSWORD);
		if(match){
			res.send({
				message: req.body.EMAIL + " account data",
				email:true,
				password:true,
				data: resultat
			});
		}else{
			res.send({
				message: req.body.EMAIL + " valid , password not valid",
				email:true,
				password:false
			});
		}
		
	} else {
		res.send({
			message: req.body.EMAIL + " not valid , password not valid",
				email:false,
				password:false
		});
	}
})


app.get('/candidats/:idcandidat', async function (req, res) {
	console.log(req.params.idcandidat + " candidats g data");
	const resultat = (await getTables("candidats", "idcandidat", req.params.idcandidat, null, null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.idcandidat + " candidats succées");
		res.send({
			message: req.params.idcandidat + " candidats g data",
			data: resultat
		});
	} else {
		console.log(req.params.idcandidat + " candidats not found");
		res.send({
			message: req.params.idcandidat + " candidats data not found",
		});
	}
})


app.get('/candidats/EMAIL/:email', async function (req, res) {
	console.log(req.params.email + " candidat data");
	const resultat = (await getTables("candidats", "email", req.params.email, null, null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.email + " candidat succées");
		res.send({
			message: req.params.email + " candidat data",
			data: resultat
		});
	} else {
		console.log(req.params.email + " candidat not found");
		res.send({
			message: req.params.email + " candidat data not found",
		});
	}
})




app.get('/post/:id_post', async function (req, res) {
	console.log(req.params.id_post + " post data");
	const resultat = (await getTables("post", "id_post", req.params.id_post, null, null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.id_post + " post succées");
		res.send({
			message: req.params.id_post + " post data",
			data: resultat
		});
	} else {
		console.log(req.params.id_post + " post failed");
		res.send({
			message: req.params.id_post + " post data not found",
		});
	}
})

app.get('/formations/:idformation', async function (req, res) {
	console.log("get formations");
	const resultat = (await getTables("formations", "idformation", req.params.idformation, null, null)).rows;
	if (resultat.length > 0) {
		res.send({
			message: req.params.idformation + " ALL formations data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.idformation + " formations data not found",
		});
	}
})

app.get('/experiences/:idexperience', async function (req, res) {
	console.log("get experiences");
	const resultat = (await getTables("experiences", "idexperience", req.params.idexperience, null, null)).rows;
	if (resultat.length > 0) {
		res.send({
			message: req.params.idexperience + " ALL experiences data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.idexperience + " experiences data not found",
		});
	}
})


app.get('/centreinterets/:idcentreinteret', async function (req, res) {
	console.log("get message");
	const resultat = (await getTables("centreinterets", "idcentreinteret", req.params.idcentreinteret, null, null)).rows;
	if (resultat.length > 0) {
		res.send({
			message: req.params.idcentreinteret + " ALL centreinterets data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.idcentreinteret + " centreinterets data not found",
		});
	}
})

app.get('/specialites/:idspecialite', async function (req, res) {
	console.log(req.params.idspecialite + " specialites data");
	const resultat = (await getTables("specialites", "idspecialite", req.params.idspecialite, null, null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.idspecialite + " specialites succées");
		res.send({
			message: req.params.idspecialite + " specialites data",
			data: resultat
		});
	} else {
		console.log(req.params.idspecialite + " specialites failed");
		res.send({
			message: req.params.idspecialite + " specialites data not found",
		});
	}
})


app.get('/langues/:idlangue', async function (req, res) {
	console.log(req.params.idlangue + " langues data");
	const resultat = (await getTables("langues", "idlangue", req.params.idlangue, null, null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.idlangue + " langues succées");
		res.send({
			message: req.params.idlangue + " langues data",
			data: resultat
		});
	} else {
		console.log(req.params.idlangue + " langues failed");
		res.send({
			message: req.params.idlangue + " langues data not found",
		});
	}
})


app.get('/offre/:idoffre', async function (req, res) {
	console.log(req.params.idoffre + " offre data");
	const resultat = (await getTables("offre", "idcv", req.params.idoffre, null, null)).rows;
	if (resultat.length > 0) {
		console.log(req.params.idoffre + " offre succées");
		res.send({
			message: req.params.idoffre + " offre data",
			data: resultat
		});
	} else {
		console.log(req.params.idoffre + " offre failed");
		res.send({
			message: req.params.idoffre + " offre data not found",
		});
	}
})

app.get('/postuler/?IDOFFRE/:idoffre&IDCANDIDAT/:idcandidat', async function (req, res) {
	console.log(req.params.idcandidat + " postuler data");
	const resultat = (await getTables("postuler", "idoffre", req.params.idoffre, "idcandidat", req.params.idcandidat)).rows;
	if (resultat.length > 0) {
		console.log(req.params.idcandidat + " postuler succées");
		res.send({
			message: req.params.idcandidat + " postuler data",
			data: resultat
		});
	} else {
		console.log(req.params.idcandidat + " postuler failed");
		res.send({
			message: req.params.idcandidat + " postuler data not found",
		});
	}
})

///////////////
///////////////       GET DATA WITH Count Postuler
///////////////

app.get('/postuler/count/0', async function (req, res) {
	console.log(req.params.idcandidat + " postuler data");
	const resultat = (await getNumbreOfPostulation()).rows;
	if (resultat.length > 0) {
		console.log("NumbreOf postuler succées");
		res.send({
			message: "NumbreOf postuler data",
			data: resultat
		});
	} else {
		console.log("NumbreOf postuler failed");
		res.send({
			message: "NumbreOf postuler data not found",
		});
	}
})


///////////////
///////////////       GET DATA WITH USER
///////////////



app.get('/formations/?IDCANDIDAT/:idcandidat', async function (req, res) {
	console.log(req.params.idcandidat + "candidat formations data");
	const resultat = (await getTables("formations", "idcandidat", req.params.idcandidat)).rows;
	if (resultat.length > 0) {
		console.log(req.params.idcandidat + " formations succées");
		res.send({
			message: req.params.idcandidat + " candidat formations data",
			data: resultat
		});
	} else {
		console.log(req.params.idcandidat + " formations failed");
		res.send({
			message: req.params.idcandidat + " formation data not found",
		});
	}
})

app.get('/experiences/?IDCANDIDAT/:idcandidat', async function (req, res) {
	console.log(req.params.idcandidat + "candidat experiences data");
	const resultat = (await getTables("experiences", "idcandidat", req.params.idcandidat)).rows;
	if (resultat.length > 0) {
		console.log(req.params.idcandidat + " experiences succées");
		res.send({
			message: req.params.idcandidat + " candidat experiences data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.idcandidat + " experience data not found",
		});
	}
})

app.get('/specialites/?IDCANDIDAT/:idcandidat', async function (req, res) {
	console.log(req.params.idcandidat + "candidat specialites data");
	const resultat = (await getTables("specialites", "idcandidat", req.params.idcandidat)).rows;
	if (resultat.length > 0) {
		console.log(req.params.idcandidat + " specialites succées");
		res.send({
			message: req.params.idcandidat + " candidat specialites data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.idcandidat + " specialite data not found",
		});
	}
})




app.get('/langues/?IDCANDIDAT/:idcandidat', async function (req, res) {
	console.log(req.params.idcandidat + "candidat langues data");
	const resultat = (await getTables("langues", "idcandidat", req.params.idcandidat)).rows;
	if (resultat.length > 0) {
		console.log(req.params.idcandidat + " langues succées");
		res.send({
			message: req.params.idcandidat + "candidat specialites data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.idcandidat + " langue data not found",
		});
	}
})



app.get('/centreinterets/?IDCANDIDAT/:idcandidat', async function (req, res) {
	console.log(req.params.idcandidat + "candidat centreinterets data");
	const resultat = (await getTables("centreinterets", "idcandidat", req.params.idcandidat)).rows;
	if (resultat.length > 0) {
		console.log(req.params.idcandidat + " centreinterets succées");
		res.send({
			message: req.params.idcandidat + "candidat centreinterets data",
			data: resultat
		});
	} else {
		res.send({
			message: req.params.idcandidat + " centreinteret data not found",
		});
	}
})

app.get('/postuler/IDCANDIDAT/:idcandidat', async function (req, res) {
	console.log(req.params.idcandidat + " postuler data");
	const resultat = (await getTables("postuler", "idcandidat", req.params.idcandidat)).rows;
	if (resultat.length > 0) {
		console.log(req.params.idcandidat + " postuler succées");
		res.send({
			message: req.params.idcandidat + " postuler data",
			data: resultat
		});
	} else {
		console.log(req.params.idcandidat + " postuler failed");
		res.send({
			message: req.params.idcandidat + " postuler data not found",
		});
	}
})


///////////////
///////////////       GET DATA WITH OFFRE
///////////////


app.get('/postuler/IDOFFRE/:idoffre', async function (req, res) {
	console.log(req.params.idoffre + " postuler data");
	const resultat = (await getCandidatPostulerByOffre(req.params.idoffre)).rows;
	if (resultat.length > 0) {
		console.log(req.params.idoffre + " postuler succées");
		res.send({
			message: req.params.idoffre + " postuler data",
			data: resultat
		});
	} else {
		console.log(req.params.idoffre + " postuler failed");
		res.send({
			message: req.params.idoffre + " postuler data not found",
		});
	}
})


///////////////
///////////////       GET DATA WITH LIST OF IDCANDIDAT
///////////////


app.get('/candidats/IDCANDIDAT/:idcandidat&date/any', async function (req, res) {
	console.log(req.params.idcandidat + " candidatsS data");
	const resultat = (await getCandidatByList(req.params.idcandidat)).rows;
	if (resultat.length > 0) {
		console.log(req.params.idcandidat + " candidatsS succées");
		res.send({
			message: req.params.idcandidat + " candidatsS data",
			data: resultat
		});
	} else {
		console.log(req.params.idcandidat + " candidatsS failed");
		res.send({
			message: req.params.idcandidat + " candidatsS data not found",
		});
	}
})







//////////////
//////////////          INSERT DATA
/////////////


async function insertdata(table, pid, p2, p3, p4, p5, p6, p7, p8, p9) {

	if (table == "account") {
		connection.execute("insert into account values(:email,:password,'USER')", {
			email: pid,
			password: p2
		}, {
			autoCommit: true
		})

	} else if (table == "candidats") {
		connection.execute("insert into CANDIDATS values(seq_candidat_id.nextval,:nom,:prenom,to_date(:datee,'YYYY/MM/DD'),:lieunaissance,:nationalite,:adresse,:telephone,:email)", {
			nom: p2,
			prenom: p3,
			datee: p4,
			lieunaissance: p5,
			nationalite: p6,
			adresse: p7,
			telephone: p8,
			email: p9
		}, {
			autoCommit: true
		})

	} else if (table == "formations") {
		connection.execute("insert into formations values(seq_formation_id.nextval,:diplome,:institut,:anneescolaire,:mention,:idcandidat)", {

			diplome: p2,
			institut: p3,
			anneescolaire: p4,
			mention: p5,
			idcandidat: p6
		}, {
			autoCommit: true
		})
	} else if (table == "experiences") {
		connection.execute("insert into experiences values(seq_experience_id.nextval,:type,to_date(:datee,'YYYY/MM/DD'),:entreprise,:departementservice,:idcandidat)", {

			type: p2,
			datee: p3,
			entreprise: p4,
			departementservice: p5,
			idcandidat: p6
		}, {
			autoCommit: true
		})
	} else if (table == "centreinterets") {
		connection.execute("insert into centreinterets values(seq_centreinteret_id.nextval,:intitule,:idcandidat)", {

			intitule: p2,
			idcandidat: p3
		}, {
			autoCommit: true
		})
	} else if (table == "langues") {
		connection.execute("insert into langues values(seq_langue_id.nextval,:nom,:niveau,:idcandidat)", {

			nom: p2,
			niveau: p3,
			idcandidat: p4
		}, {
			autoCommit: true
		})
	} else if (table == "specialites") {
		connection.execute("insert into specialites values(seq_specialite_id.nextval,:intitule,:idcandidat)", {

			intitule: p2,
			idcandidat: p3
		}, {
			autoCommit: true
		})
	} else if (table == "offre") {
		connection.execute("insert into offre values(seq_offre_id.nextval,:type,:poste,:description,:competences,:lieu,sysdate,:salaire,:contrat,:dureecontrat,0)", {
			type: p2,
			poste: p3,
			description: p4,
			competences: p5,
			lieu: p6,
			salaire: p7,
			contrat: p8,
			dureecontrat: p9
		}, {
			autoCommit: true
		})
	} else if (table == "postuler") {
		connection.execute("insert into postuler values(:idoffre,:idcandidat,sysdate)", {
			idoffre: p2,
			idcandidat: p3,
		}, {
			autoCommit: true
		})
	}

}

var loginValidate = [
		// Check Username
		check('EMAIL', 'Username Must Be an Email Address').isEmail()
		.trim().escape().normalizeEmail(),
		// Check Password
		check('PASSWORD').isLength({ min: 6 }).
		withMessage('Password Must Be at Least 6 Characters').
		trim().escape()
	];

app.post('/account/create',loginValidate, async (req, res)=> {
	
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	else {
		let EMAIL = req.body.EMAIL;
		let PASSWORD = bcrypt.hashSync(req.body.PASSWORD, salt);
		insertdata('account', EMAIL, PASSWORD, null, null, null, null, null, null, null);
		res.send({
			message: "account data inserted"
		})
		console.log("account data inserted")
	}
	
})


app.post('/candidats', async function (req, res) {
	let NOM = req.body.NOM;
	let PRENOM = req.body.PRENOM;
	let DATENAISSANCE = req.body.DATENAISSANCE;
	let LIEUNAISSANCE = req.body.LIEUNAISSANCE;
	let NATIONALITE = req.body.NATIONALITE;
	let ADRESSE = req.body.ADRESSE;
	let TELEPHONE = req.body.TELEPHONE;
	let EMAIL = req.body.EMAIL;
	insertdata('candidats', null, NOM, PRENOM, DATENAISSANCE, LIEUNAISSANCE, NATIONALITE, ADRESSE, TELEPHONE, EMAIL);
	res.send({
		message: "candidat data inserted"
	})
	console.log("candidat data inserted")
})

app.post('/formations', async function (req, res) {
	let DIPLOME = req.body.DIPLOME;
	let INSTITUT = req.body.INSTITUT;
	let ANNEESCOLAIRE = req.body.ANNEESCOLAIRE;
	let MENTION = req.body.MENTION;
	let IDCANDIDAT = req.body.IDCANDIDAT;
	insertdata('formations', null, DIPLOME, INSTITUT, ANNEESCOLAIRE, MENTION, IDCANDIDAT, null, null, null);
	res.send({
		message: "formation data inserted"
	})
	console.log("formation data inserted")
})

app.post('/experiences', async function (req, res) {
	let TYPE = req.body.TYPE;
	let DATEDEBUT = req.body.DATEDEBUT;
	let ENTREPRISE = req.body.ENTREPRISE;
	let DEPARTEMENTSERVICE = req.body.DEPARTEMENTSERVICE;
	let IDCANDIDAT = req.body.IDCANDIDAT;
	insertdata("experiences", null, TYPE, DATEDEBUT, ENTREPRISE, DEPARTEMENTSERVICE, IDCANDIDAT, null, null, null);
	res.send({
		message: "experience data inserted"
	})
	console.log("experience data inserted")
})

app.post('/centreinterets', async function (req, res) {
	let IDCENTREINTERET = req.body.IDCENTREINTERET;
	let INTITULE = req.body.INTITULE;
	let IDCANDIDAT = req.body.IDCANDIDAT;

	insertdata("centreinterets", IDCENTREINTERET, INTITULE, IDCANDIDAT, null, null, null, null, null, null);
	res.send({
		message: "centreinteret data inserted"
	})
	console.log("centreinteret data inserted")
})


app.post('/specialites', async function (req, res) {
	let INTITULE = req.body.INTITULE;
	let IDCANDIDAT = req.body.IDCANDIDAT;

	insertdata("specialites", null, INTITULE, IDCANDIDAT, null, null, null, null, null, null);
	res.send({
		message: "specialite data inserted"
	})
	console.log("specialite data inserted")
})


app.post('/langues', async function (req, res) {
	let IDLANGUE = req.body.IDLANGUE;
	let NOM = req.body.NOM;
	let NIVEAU = req.body.NIVEAU;
	let IDCANDIDAT = req.body.IDCANDIDAT;

	insertdata("langues", IDLANGUE, NOM, NIVEAU, IDCANDIDAT, null, null, null, null, null);
	res.send({
		message: "langue data inserted"
	})
	console.log("langue data inserted")
})

app.post('/offre', async function (req, res) {
	let TYPE = req.body.TYPE;
	let POSTE = req.body.POSTE;
	let DESCRIPTION = req.body.DESCRIPTION;
	let COMPETENCES = req.body.COMPETENCES;
	let LIEU = req.body.LIEU;
	let SALAIRE = req.body.SALAIRE;
	let CONTRAT = req.body.CONTRAT;
	let DUREECONTRAT = req.body.DUREECONTRAT;
	insertdata('offre', null, TYPE, POSTE, DESCRIPTION, COMPETENCES, LIEU, SALAIRE, CONTRAT, DUREECONTRAT, null);
	res.send({
		message: "offre data inserted"
	})
	console.log("offre data inserted")
})

app.post('/postuler', async function (req, res) {
	let IDOFFRE = req.body.IDOFFRE;
	let IDCANDIDAT = req.body.IDCANDIDAT;

	insertdata('postuler', null, IDOFFRE, IDCANDIDAT, null, null, null, null, null, null, null);
	res.send({
		message: "postuler data inserted"
	})
	console.log("postuler data inserted")
})



//////////////
//////////////          UPDATE DATA
/////////////



async function updatedata(table, pid, p2, p3, p4, p5, p6, p7, p8, p9) {
	connection = await run();


	if (table == "account") {
		connection.execute("update account set USERNAME=:username ,PASSWORD=password,type=:lieu where EMAIL=:email ", {
			email: pid,
			username: p2,
			password: p3,
			type: p4

		}, {
			autoCommit: true
		})

	} else if (table == "candidats") {
		connection.execute("update CANDIDATS set NOM=:nom,PRENOM=:prenom ,DATENAISSANCE=to_date(:datee,'YYYY/MM/DD'),LIEUNAISSANCE=:lieu,NATIONALITE=:nationalite,ADRESSE=:adresse,TELEPHONE=:telephone,EMAIL=:email where IDCANDIDAT=:id", {
			id: pid,
			nom: p2,
			prenom: p3,
			datee: p4,
			lieu: p5,
			nationalite: p6,
			adresse: p7,
			telephone: p8,
			email: p9
		}, {
			autoCommit: true
		})

	} else if (table == "formations") {
		connection.execute("update formations set DIPLOME=:diplome,INSTITUT=:institut,ANNEESCOLAIRE=:anneescolaire,MENTION=:mention,IDCANDIDAT=:idcandidat where IDFORMATION=:id", {
			id: pid,
			diplome: p2,
			institut: p3,
			anneescolaire: p4,
			mention: p5,
			idcandidat: p6
		}, {
			autoCommit: true
		})
	} else if (table == "experiences") {
		connection.execute("update experiences set TYPE=:type,DATEDEBUT=to_date(:datee,'YYYY/MM/DD'),ENTREPRISE=:entreprise,DEPARTEMENTSERVICE=:departementservice,IDCANDIDAT=:idcandidat where IDEXPERIENCE=:id", {
			id: pid,
			type: p2,
			datee: p3,
			entreprise: p4,
			departementservice: p5,
			idcandidat: p6
		}, {
			autoCommit: true
		})
	} else if (table == "centreinterets") {
		connection.execute("update centreinterets set INTITULE=:intitule,IDCANDIDAT=:idcandidat where IDCENTREINTERET=:id", {
			id: pid,
			intitule: p2,
			idcandidat: p3
		}, {
			autoCommit: true
		})
	} else if (table == "langues") {
		connection.execute("update langues set NOM=:nom,NIVEAU=:niveau,IDCANDIDAT=:idcandidat where IDLANGUE=:id", {
			id: pid,
			nom: p2,
			niveau: p3,
			idcandidat: p4
		}, {
			autoCommit: true
		})
	} else if (table == "specialites") {
		connection.execute("update specialites set INTITULE=:intitule,IDCANDIDAT=:idcandidat where IDSPECIALITE=:id", {
			id: pid,
			intitule: p2,
			idcandidat: p3
		}, {
			autoCommit: true
		})
	} else if (table == "cv") {
		connection.execute("update cv set IDFORMATION=:idformation,IDSPECIALITE=:idspecialite,IDEXPERIENCE=:idexperience,IDCENTREINTERET=:idcentreinteret,IDLANGUE=:idlangue,IDCANDIDAT=:idcandidat where IDCV=:id", {
			id: pid,
			idformation: p2,
			idspecialite: p3,
			idexperience: p4,
			idcentreinteret: p5,
			idlangue: p6,
			idcandidat: p7
		}, {
			autoCommit: true
		})
	}
}


app.put('/account/:email', async function (req, res) {
	let EMAIL = req.body.EMAIL;
	let USERNAME = req.body.USERNAME;
	let PASSWORD = req.body.PASSWORD;
	let TYPE = req.body.TYPE;
	updatedata('account', EMAIL, USERNAME, PASSWORD, TYPE, null, null, null, null, null);
	res.send({
		message: "account data updated"
	})
	console.log("account data updated")
})

app.put('/candidats/:idcandidat', async function (req, res) {
	let IDCANDIDAT = req.body.IDCANDIDAT;
	let NOM = req.body.NOM;
	let PRENOM = req.body.PRENOM;
	let DATENAISSANCE = req.body.DATENAISSANCE;
	let LIEUNAISSANCE = req.body.LIEUNAISSANCE;
	let NATIONALITE = req.body.NATIONALITE;
	let ADRESSE = req.body.ADRESSE;
	let TELEPHONE = req.body.TELEPHONE;
	let EMAIL = req.body.EMAIL;
	updatedata('candidats', IDCANDIDAT, NOM, PRENOM, DATENAISSANCE, LIEUNAISSANCE, NATIONALITE, ADRESSE, TELEPHONE, EMAIL);
	res.send({
		message: "candidat data updated"
	})
	console.log("candidat data updated")
})

app.put('/formations/:idformation', async function (req, res) {
	let IDFORMATION = req.body.IDFORMATION;
	let DIPLOME = req.body.DIPLOME;
	let INSTITUT = req.body.INSTITUT;
	let ANNEESCOLAIRE = req.body.ANNEESCOLAIRE;
	let MENTION = req.body.MENTION;
	let IDCANDIDAT = req.body.IDCANDIDAT;
	updatedata('formations', IDFORMATION, DIPLOME, INSTITUT, ANNEESCOLAIRE, MENTION, IDCANDIDAT, null, null, null);
	res.send({
		message: "formation data updated"
	})
	console.log("formation data updated")
})

app.put('/experiences/:idexperience', async function (req, res) {
	let IDEXPERIENCE = req.body.IDEXPERIENCE;
	let TYPE = req.body.TYPE;
	let DATEDEBUT = req.body.DATEDEBUT;
	let ENTREPRISE = req.body.ENTREPRISE;
	let DEPARTEMENTSERVICE = req.body.DEPARTEMENTSERVICE;
	let IDCANDIDAT = req.body.IDCANDIDAT;
	updatedata("experiences", IDEXPERIENCE, TYPE, DATEDEBUT, ENTREPRISE, DEPARTEMENTSERVICE, IDCANDIDAT, null, null, null);
	res.send({
		message: "experience data updated"
	})
	console.log("experience data updated")
})

app.put('/centreinterets/:idcentreinteret', async function (req, res) {
	let IDCENTREINTERET = req.body.IDCENTREINTERET;
	let INTITULE = req.body.INTITULE;
	let IDCANDIDAT = req.body.IDCANDIDAT;
	updatedata("centreinterets", IDCENTREINTERET, INTITULE, IDCANDIDAT, null, null, null, null, null, null);
	res.send({
		message: "centreinteret data updated"
	})
	console.log("centreinteret data updated")
})

app.put('/specialites/:idspecialite', async function (req, res) {
	let IDSPECIALITE = req.body.IDSPECIALITE;
	let INTITULE = req.body.INTITULE;
	let IDCANDIDAT = req.body.IDCANDIDAT;

	updatedata("specialites", IDSPECIALITE, INTITULE, IDCANDIDAT, null, null, null, null, null, null);
	res.send({
		message: "specialite data updated"
	})
	console.log("specialite data updated")
})


app.put('/langues/:idlangue', async function (req, res) {
	let IDLANGUE = req.body.IDLANGUE;
	let NOM = req.body.NOM;
	let NIVEAU = req.body.NIVEAU;
	let IDCANDIDAT = req.body.IDCANDIDAT;

	updatedata("langues", IDLANGUE, NOM, NIVEAU, IDCANDIDAT, null, null, null, null, null);
	res.send({
		message: "langue data updated"
	})
	console.log("langue data updated")
})




//////////////
//////////////          DELETE DATA
/////////////


app.delete('/account/:email', async function (req, res) {
	connection = await run();
	await connection.execute("delete from account where email ='" + req.params.email + "'")
	connection.commit();
	res.send({
		message: 'account data deleted'
	})
	console.log('account data deleted')
})


app.delete('/candidats/:idcandidat', async function (req, res) {
	connection = await run();
	await connection.execute("delete from candidats where IDCANDIDAT='" + req.params.idcandidat + "'")
	connection.commit();
	res.send({
		message: 'candidat data deleted'
	})
	console.log('candidat data deleted')
})

app.delete('/formations/:idformation', async function (req, res) {
	connection = await run();
	await connection.execute("delete from likes where IDFORMATION='" + req.params.idformation + "'")
	connection.commit();
	res.send({
		message: 'formation data deleted'
	})
	console.log('formation data deleted')
})

app.delete('/experiences/:idexperience', async function (req, res) {
	connection = await run();
	await connection.execute("delete from experiences where IDEXPERIENCE='" + req.params.idexperience + "'")
	connection.commit();
	res.send({
		message: 'experience data deleted'
	})
	console.log('experience data deleted')
})

app.delete('/centreinterets/:idcentreinteret', async function (req, res) {
	connection = await run();
	await connection.execute("delete from centreinterets where IDCENTREINTERET='" + req.params.idcentreinteret + "'")
	connection.commit();
	res.send({
		message: 'centreinteret data deleted'
	})
	console.log('centreinteret data deleted')
})

app.delete('/specialites/:idspecialite', async function (req, res) {
	connection = await run();
	await connection.execute("delete from specialites where IDSPECIALITE='" + req.params.idspecialite + "'")
	connection.commit();
	res.send({
		message: 'specialite data deleted'
	})
	console.log('specialite data deleted')
})

app.delete('/langues/:idlangue', async function (req, res) {
	connection = await run();
	await connection.execute("delete from langues where IDLANGUE='" + req.params.idlangue + "'")
	connection.commit();
	res.send({
		message: 'langue data deleted'
	})
	console.log('langue data deleted')
})


app.delete('/offre/:idoffre', async function (req, res) {
	connection = await run();
	await connection.execute("delete from offre where IDOFFRE='" + req.params.idoffre + "'");
	console.log("delete " + req.params.idoffre + " avec succées")
	connection.commit();
	res.send({
		message: 'offre data deleted'
	})
	console.log('offre data deleted')
})




app.listen(3000, () => {
	console.log("server running ... in 3000");
})




