import app from './app';


const PROT = 4000;


const handleListening = () => 
  console.log(`✅ Listening on: http://localhost:${PROT}`);


app.listen(PROT, handleListening);