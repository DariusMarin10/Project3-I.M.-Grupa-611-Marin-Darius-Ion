<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
const app = express()
const cors = require("cors");
const sqlite = require("sqlite3").verbose();

app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access Control Allow Origin", "*");
    next();

});
app.use(express.json({limit:'10mb'}))


let db = new sqlite.Database("./DariusDb.db", sqlite.OPEN_READWRITE, (err)=>{
if (err){
    console.error(err);
} 
console.log('Connected to the access database');
})

app.post('/validatePassword', (req, res)=>{
const {user, password} = req.body

db.all(`select * from APP.USERS where user = '${user}' and password = '${password}'`,  (err, rows) =>
  { if (err){
    throw err;
   }
   if(rows.length > 0){
    res.send({validation: true})
   }
   else{
    res.send({validation: false})
   }
})
})
